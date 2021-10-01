import React from "react";
import { withRouter } from 'react-router-dom';
// import { useParams, useHistory } from "react-router";
import GroceryDataService from "../services/store"
import Unauthorized from "./Unauthorized";

// const UpdateUser = () => {

//     const{id} = useParams()
//     const history = useHistory()
//     const user = JSON.parse(localStorage.getItem("user"))

//     const[data, setData] = useState({
//         "id" : id,
//         "name" : "",
//         "type" : "",
//         "password": ""
//     })


//     const handleChange = (e) => {
//         setData({
//             ...data,
//             [e.target.name] : e.target.value
//         })
//     }

//     const handleClick = (e) => {
//         e.preventDefault()
//         GroceryService.updateUser(data)
//         .then(res => {console.log(res)
//             history.push('/person')
//         })
//         .catch(err => console.log(err.message))
//     }

//     if(user !== null && user.type === "admin"){
//     return ( 
//     <div className="container">
//         <form style={{ "margin": "2em" }}>
//             <h4>Update User Details For {id}</h4>
//             <div className="mb-3">
//               <label htmlFor="uname" className="form-label">New User Name</label>
//               <input type="text" name="name" className="form-control" id="uname" onChange={handleChange} required/>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="type" className="form-label">User Type</label>
//               <input type="text" name="type" className="form-control" id="type"onChange={handleChange} required/>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="pwd" className="form-label">New Password</label>
//               <input type="password" name="password" className="form-control" id="pwd" onChange={handleChange} required/>
//             </div>
//             <button type="submit" className="btn btn-primary" onClick={handleClick} >Update</button>
//           </form>
//     </div>
//      )}
//      else{
//        return <Unauthorized/>
//      }
// }

class UpdateUser extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      selectedUser: {
        "name": "",
        "type": "",
        "password": ""
      },
      id: "",
      selectedUserName:""
    }
  }
  
  componentDidMount() {
    GroceryDataService.showUserDetails()
      .then(res => {
        this.setState({ user: res.data });
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]._id === window.location.pathname.split("/")[2]) {
            this.setState({ id: res.data[i]._id })
            this.setState({ selectedUserName: res.data[i].name })

            for (let key in res.data[i]) {              
              if (key!=="_id") {
                this.setState(({ selectedUser }) => ({
                  selectedUser: {
                    ...selectedUser,
                    [key]:res.data[i][key]
                  }
                }));
              } else {
                this.setState(({ selectedUser }) => ({
                  selectedUser: {
                    ...selectedUser,
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
        this.setState(({ selectedUser }) => ({
          selectedUser: {
            ...selectedUser,
            [e.target.name]: e.target.value
          }
        }));
      }
      const handleClick = (e) => {
        e.preventDefault()
        GroceryDataService.updateUser(this.state.selectedUser)
          .then(res => {
            console.log(res)
            this.props.history.push('/person')
          })
          .catch(err => console.log(err.message))
      }
      return (
        <div className="container">
          <form style={{ "margin": "2em" }}>
            <h4>Update User Details For {this.state.selectedUserName}</h4>
            <div className="mb-3">
              <label htmlFor="uname" className="form-label">New User Name</label>
              <input type="text" name="name" className="form-control" id="uname" onChange={handleChange} value={this.state.selectedUser["name"]} required />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">User Type</label>
              <input type="text" name="type" className="form-control" id="type" onChange={handleChange} value={this.state.selectedUser["type"]} required />
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">New Password</label>
              <input type="password" name="password" className="form-control" id="pwd" onChange={handleChange} value={this.state.selectedUser["password"]} required />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick} >Update</button>
          </form>
        </div>
      );
    }
    else {
      return <Unauthorized />
    }
  }
}

export default withRouter(UpdateUser);