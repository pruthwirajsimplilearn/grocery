import { useHistory } from "react-router";
import { useState } from "react";
import Unauthorized from "./Unauthorized";
import GroceryDataService from "../services/store"

const AddProduct = () => {

  const history = useHistory()
  const user = JSON.parse(localStorage.getItem("user"))

  const [data, setData] = useState({
    "title": "",
    "type": "",
    "description": "",
    "filename": "",
    "height": 100,
    "width": 300,
    "price": 0,
    "rating": 0
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = (e) => {
    e.preventDefault();
    console.log(data);
    GroceryDataService.addProduct(data)
      .then(res => {
        console.log(res)
        history.push('/productlist')
      })
      .catch(err => console.log(err.message))
  }


  if (user !== null && user.type === "admin") {
    return (
      <div className="container">
        <form style={{ "margin": "2em" }}>
          <h4>ADDING NEW PRODUCT</h4>
          <div className="mb-3">
            <label htmlFor="titlw" className="form-label">Title</label>
            <input type="text" name="title" className="form-control" id="title" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">Type</label>
            <input type="text" name="type" className="form-control" id="type" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Description</label>
            <input type="text" name="description" className="form-control" id="desc" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">Filename</label>
            <input type="text" name="filename" className="form-control" id="file" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="text" name="price" className="form-control" id="price" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">Rating</label>
            <input type="text" name="rating" className="form-control" id="rating" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick} >Add New Product</button>
        </form>
      </div>
    )
  }
  else {
    return <Unauthorized />
  }
}

export default AddProduct;