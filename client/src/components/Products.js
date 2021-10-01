import { useEffect, useState } from "react";
import GroceryDataService from "../services/store"

const Products = () => {

    const loggeduser = JSON.parse(localStorage.getItem("user"))

    const [products, setProducts] = useState()

    const [wishlistdata, setWishlist] = useState({
        user_id: "",
        item_id: "",
        item_name: "",
        item_image: ""
    })

    const fun = (data) => {
        setProducts(data)
    }

    useEffect(() => {
        const fetch = () => {
            GroceryDataService.getProducts()
                .then(res => {
                    fun(res.data)
                })
                .catch(err => console.log(err))
        }
        fetch()
    }, [])

    const handleWishlist = (e) => {
        if (loggeduser === null) {
            alert("Login First")
        }
        else {
            const path = e.target.parentElement.parentElement.children[0].src
            const img = path.split("/").pop()

            const data = {
                id: e.target.parentElement.children[0].value,
                name: e.target.parentElement.children[1].innerText,
                img: img
            }

            setWishlist({
                user_id: loggeduser._id,
                item_id: data.id,
                item_name: data.name,
                item_image: data.img
            })
            GroceryDataService.addToWishlist(wishlistdata)
                .then(res => {
                    console.log(res)
                    console.log("Added To Wishlist");
                })
                .catch(err => console.log(err))
        }
    }

    const handleCart = (e) => {
        if (loggeduser === null) {
            alert("Login First")
        }
        else {
            const path = e.target.parentElement.parentElement.children[0].src
            const img = path.split("/").pop()

            const data = {
                user_id: loggeduser._id,
                item_id: e.target.parentElement.children[0].value,
                item_name: e.target.parentElement.children[1].innerText,
                item_image: img,
                item_price: e.target.parentElement.children[2].innerText.split(" ").pop()
            }

            GroceryDataService.addToCart(data)
                .then(res => console.log(res.status))
                .catch(err => console.log(err))

        }
    }

    const imgStyle = {height:"20em",padding:"2em"}

    let cards;
    if (products && products.length !== 0) {
        cards = products.map(product =>
            <div className="col" key={product._id}>
                <div className="card mb-3">
                    <img style={imgStyle} src={`/images/${product.filename}`} alt="..." />
                    <div className="card-body">
                        <input type="hidden" value={product._id} />
                        <h5 className="card-title">{product.title}</h5>
                        <small className="card-subtitle">{'$ ' + product.price}</small>
                        <p className="card-text">{product.description}</p>
                        <button className='btn btn-outline-primary' onClick={(e) => handleWishlist(e)}>Add To WishList</button> <span />
                        <button className='btn btn-outline-success' onClick={(e) => handleCart(e)}>Add To Cart</button>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">{'Rating: ' + product.rating}</small>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div style={{ padding: "1.5em", backgroundColor: "#0F1111", color: "wheat", borderRadius: "0px 0px 25px 25px" }}><marquee><h2>Festive Offer... Extra 10% discount on every products</h2></marquee></div>
            <div style={{ "margin": "1em 3em" }}>
                <div className="row row-cols-md-3">
                    {cards}
                </div>
            </div>
        </div>
    );
}

export default Products;