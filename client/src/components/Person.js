import { useEffect, useState } from "react";
import GroceryDataService from "../services/store"
import { Link } from "react-router-dom"
import Unauthorized from "./Unauthorized";
const Person = () => {
    const loggeduser = JSON.parse(localStorage.getItem("user"))

    const [user, setUser] = useState([])
    useEffect(() => {
        // console.log(loggeduser.type);
        const getUserData = () => {
            GroceryDataService.showUserDetails()
                .then(res => {
                    setUser(res.data)
                    console.log(user.length, user.type);
                })
                .catch(err => console.log(err))
        }
        getUserData()
    }, [])

    var count = 1;
    let tableProducts;
    if (user.length !== 0) {
        tableProducts = user.map(person =>
            <tr key={person._id}>
                <td>{count++}</td>
                <td>{person.name}</td>
                <td>{person.type}</td>
                <td><Link to={`/updateuser/${person._id}`}><button className="btn btn-warning">UPDATE</button></Link></td>
                <td><button className="btn btn-danger" onClick={() => { handleClick(person._id) }}>DELETE</button></td>
            </tr>
        )
    }

    const handleClick = (id) => {
        // e.preventDefault()
        console.log("id: " + id);
        GroceryDataService.deleteUser(id)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    if (loggeduser !== null && loggeduser.type === "admin") {
        return (

            <div className="container">
                <div className="row">
                    <h1 style={{ "margin": "1rem" }} className="col-sm-8">DASHBOARD</h1>
                    <div className="col-sm">
                        <Link to='/adduser'><button className='btn btn-secondary' style={{margin:"1em"}}><h5>ADD USER</h5></button></Link>
                        <Link to='/productlist'><button className='btn btn-primary'><h5>MANAGE Products</h5></button></Link>
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sl.No.</th>
                            <th scope="col">NAME</th>
                            <th scope="col">USER TYPE</th>
                            <th scope="col">UPDATE</th>
                            <th scope="col">DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableProducts}
                    </tbody>
                </table>
            </div>

        )
    }
    else {
        return (<Unauthorized />)
    }
}

export default Person;