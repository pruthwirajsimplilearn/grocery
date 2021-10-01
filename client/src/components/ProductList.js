import { useEffect, useState } from "react";
import GroceryDataService from "../services/store";
import { Link } from "react-router-dom";
import { AiOutlineFileAdd } from "react-icons/ai"

const ProductList = () => {

    const [products, setProducts] = useState()

    const fun = (data) => {
        setProducts(data)
    }

    useEffect(() => {
        //console.log("Hello");
        const fetch = () => {
            GroceryDataService.getProducts()
                .then(res => {
                    fun(res.data)
                })
                .catch(err => console.log(err))
                .finally(() =>
                    console.log(products)
                )
        }
        //console.log(Products);
        fetch()
    }, [])

    const handleClick = (id) => {
        GroceryDataService.deleteProduct(id)
            .then(res => {
                console.log(res.status)
                alert('Successfully Deleted.')
            })
            .catch(err => console.log(err))
    }

    var count = 1;
    let tableProducts;
    if (products && products.length !== 0) {
        tableProducts = products.map(ele =>
            <tr key={ele._id}>
                <td>{count++}</td>
                <td>{ele.title}</td>
                <td>{ele.type}</td>
                <td>{ele.description}</td>                
                <td>Rs. {ele.price}</td>
                <td><Link to={`/updateproduct/${ele._id}`}><button className="btn btn-primary">UPDATE</button></Link></td>
                <td><button className="btn btn-danger" onClick={() => { handleClick(ele._id) }}>DELETE</button></td>
            </tr>
        )
    }

    return (
        <div className="container">
            <div className="row">
                <h1 className="col-sm-3" style={{"margin": "1em" }}>ITEM LIST</h1>
                <h4 className="col-sm" style={{float:"right",marginLeft:"45%",padding:"2em"}}><Link to='/addproduct'>Add New Item<AiOutlineFileAdd/></Link></h4>
            </div>
            <table className="table" style={{ "margin": "1em" }}>
                <thead>
                    <tr>
                        <th scope="col">Sl.No.</th>                        
                        <th scope="col">TITLE</th>
                        <th scope="col">TYPE</th>
                        <th scope="col">DESCRIPTION</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">UPDATE</th>
                        <th scope="col">DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {tableProducts}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;