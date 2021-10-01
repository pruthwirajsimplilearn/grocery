import { useEffect, useState } from "react";
import GroceryService from '../services/store'
import { useHistory } from "react-router";

const Wishlist = () => {

    const hist = useHistory()

    const [data, setData] = useState()
    const loggedUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        viewWishlist(loggedUser._id);
    }, [])

    const viewWishlist = (id) => {
        GroceryService.showWishlist(id)
            .then(res => {
                console.log(res.data[0]);
                setData(res.data[0])
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const styleimg = {
        "transform": "scale(0.8,0.8)"
    }

    const handleClick = (e) => {
        const name = e.target.parentElement.children[0].innerText
        GroceryService.deleteFromWishlist(loggedUser._id, name)
            .then(res => {
                console.log(res.status)
                hist.go('/wishlist')
            })
            .catch(err => console.log(err))
    }

    let wishCard;
    if (data !== undefined) {
        wishCard = data.wishlist.map(ele =>

            <div className="col" key={ele.item_id}>
                <div className="card h-100 border-success" style={{ "width": "18rem", "margin": "0 2em 0 2em" }}>
                    <img src={`/images/${ele.item_image}`} className="card-img-top" alt="..." style={styleimg} />
                    <div className="card-body" >
                        <h4 className="card-title" style={{ "textAlign": "center" }}>{ele.item_name}</h4>
                        <button className="btn btn-outline-danger" style={{ "margin": "0 28%" }} onClick={(e) => { handleClick(e) }} >Delete Item</button>
                    </div>
                </div>
            </div>
        )
    }
    

    return (
        <div className="container">
            <div style={{padding:"2%"}}><h2 >YOUR WISHLIST</h2></div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {wishCard}
            </div>
        </div>
    )
}

export default Wishlist;