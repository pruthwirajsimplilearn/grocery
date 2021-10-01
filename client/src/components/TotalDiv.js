import { useEffect, useState } from "react";

const TotalDiv = () => {

    const [total, setTotal] = useState(0)

    const dataobj = localStorage.getItem('cart')
    //console.log(JSON.parse(dataobj));

    useEffect(() => {
        console.log("data is:");
        let data = JSON.parse(dataobj);
        let t = data.cart.reduce(function (accumulator, currentValue) {
            return accumulator + parseFloat(currentValue.item_price);
        }, 0);
        setTotal(t)
    }, [dataobj])

    return (
        <div>
            <h3>Total:<br/> Rs. {total}</h3>
            <button className="btn btn-warning" style={{ "marginTop": "1em" }}>CHECKOUT</button>
        </div>
    );
}

export default TotalDiv;