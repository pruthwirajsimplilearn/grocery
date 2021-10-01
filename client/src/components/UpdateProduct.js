
import React from "react";
import { withRouter } from 'react-router-dom';
import Unauthorized from "./Unauthorized";
import GroceryDataService from "../services/store"

class UpdateProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      selectedItem: {
        "title": "",
        "type": "",
        "description": "",
        "filename": "",
        "height": 100,
        "width": 300,
        "price": 0,
        "rating": 0
      },
      selectedItemTitle: "",
      id: ""
    }
  }

  componentDidMount() {
    GroceryDataService.getProducts()
      .then(res => {
        this.setState({ data: res.data });
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]._id === window.location.pathname.split("/")[2]) {
            this.setState({ id: res.data[i]._id })
            this.setState({ selectedItemTitle: res.data[i].title })

            for (let key in res.data[i]) {              
              if (key!=="_id") {
                this.setState(({ selectedItem }) => ({
                  selectedItem: {
                    ...selectedItem,
                    [key]:res.data[i][key]
                  }
                }));
              } else {
                this.setState(({ selectedItem }) => ({
                  selectedItem: {
                    ...selectedItem,
                    "id":res.data[i]._id
                  }
                }));
              }
            }
            break;
          }
        }

        console.log(this.state);
        // console.log(this.state.selectedItem);
      })
      .catch(err => console.log(err));
  }

  render() {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user !== null && user.type === "admin") {
      const handleChange = (e) => {
    
        this.setState(({ selectedItem }) => ({
          selectedItem: {
            ...selectedItem,
            [e.target.name]: e.target.value
          }
        }));
        
        // console.log(this.state.selectedItem);
      }
      const handleClick = (e) => {
        e.preventDefault();
        
        console.log(this.state.selectedItem);
        GroceryDataService.updateProduct(this.state.selectedItem)
          .then(res => {
            // console.log(res)
            this.props.history.push('/productlist')
          })
          .catch(err => console.log(err.message))
      }
      return (
        <div className="container">
          <form style={{ "margin": "2em" }}>
            <h4>Update Product Details For {this.state.selectedItemTitle}</h4>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" name="title" className="form-control" id="title" onChange={handleChange} value={this.state.selectedItem["title"]} required />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Type</label>
              <input type="text" name="type" className="form-control" id="type" onChange={handleChange}  value={this.state.selectedItem["type"]}required />
            </div>
            <div className="mb-3">
              <label htmlFor="desc" className="form-label">Description</label>
              <input type="text" name="description" className="form-control" id="desc" onChange={handleChange}  value={this.state.selectedItem["description"]} required />
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">Filename</label>
              <input type="text" name="filename" className="form-control" id="file" onChange={handleChange}  value={this.state.selectedItem["filename"]} required />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="text" name="price" className="form-control" id="price" onChange={handleChange}  value={this.state.selectedItem["price"]} required />
            </div>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">Rating</label>
              <input type="text" name="rating" className="form-control" id="rating" onChange={handleChange}  value={this.state.selectedItem["rating"]} required />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick} >Update</button>
          </form>
        </div>
      )
    }
    else {
      return <Unauthorized />
    }
  }
}

export default withRouter(UpdateProduct);