import { useState } from "react";
import GroceryDataService from "../services/store";

const Register = () => {

    const[data,setData] = useState({
        "name" : "",
        "type":"user",
        "password" : ""
      })
    
      const handleChange = (e) => {
        setData({
          ...data,
          [e.target.name] : e.target.value
        })
      }

      const handleRegsiter = (e) => {
          e.preventDefault()
        GroceryDataService.regsiterUser(data)
        .then(res => {
            if(res.status === 200)
            {
                alert('Successfully Registered. Login to Continue')
            }
        })
        .catch(err => console.log(err))
      }

    return ( 
    <div className="container">
        <form style={{ "margin": "2em" }} method="post">
            <h4>USER REGISTRATION</h4>
            <div className="mb-3">
              <label htmlFor="uname" className="form-label">User Name</label>
              <input type="text" name="name" className="form-control" id="uname" onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="upwd" className="form-label">User Password</label>
              <input type="password" name="password" className="form-control" id="upwd" onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleRegsiter}>Register</button>
           </form>
    </div> 
    );
}
 
export default Register;