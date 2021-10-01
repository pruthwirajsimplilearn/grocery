import { useState } from "react";
import { useHistory } from "react-router";
import GroceryDataService from "../services/store";
import { Link } from 'react-router-dom';

const Login = ({ setUserObject }) => {


  const [data, setData] = useState({
    "name": "",
    "password": ""
  })

  const history = useHistory()

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleAdminLogin = (e) => {
    e.preventDefault();
    GroceryDataService.adminLoginCred(data)
      .then(res => {
        if (res.data !== null) {
          setUserObject(res.data)          
          localStorage.setItem("user", JSON.stringify(res.data))
          history.push({
            pathname: '/person',
            state: { detail: data }
          })
        }
        else {
          alert("Wrong credentials")
        }
      })
      .catch(e => {
        console.log(e.message);
      })

  }

  const handleUserLogin = (e) => {
    e.preventDefault();
    GroceryDataService.userLoginCred(data)
      .then(res => {
        if (res.data !== null) {
          setUserObject(res.data)
          localStorage.setItem("user", JSON.stringify(res.data))
          history.push('/')
        }
        else {
          alert("Wrong Credentials")
        }
      })
      .catch(err => {
        console.log(err.message);
      })
  }


  return (
    <div className="container">
      <div className="row">

        <div className="col align-self-end">
          <form style={{ "margin": "2em" }}>
            <h6 style={{color:"red"}}>Are you admin ? log in here</h6>
            <h4>ADMIN LOGIN</h4>
            <div className="mb-3">
              <label htmlFor="adminname" className="form-label">Admin Name</label> (for example id: asd)
              <input type="text" name="name" className="form-control" id="adminname" onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="adminpwd" className="form-label">Admin Password</label> (and password: asd)
              <input type="password" name="password" className="form-control" id="adminpwd" onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleAdminLogin}>Login</button>
          </form>
        </div>

        <div className="col align-self-start">
          <form style={{ "margin": "2em" }}>
            <h4>USER LOGIN</h4>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">User Name</label>
              <input type="text" name="name" className="form-control" id="username" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">Password</label>
              <input type="password" name="password" className="form-control" id="pwd" onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleUserLogin}>Login</button><br /><br />
            <h6 style={{color:"red"}}>New User ? Please Register</h6>
            <Link to='/register'><button className="btn btn-success">Register Here</button></Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;