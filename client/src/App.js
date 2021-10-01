import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import Products from './components/Products';
import Person from './components/Person';
import Navbar from './components/Navbar';
import AddUser from './components/AddUser';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist'
import Register from './components/Register'
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct'
import AddProduct from './components/AddProduct';
import UpdateUser from './components/UpdateUser';

function App() {

  const [user, setUser] = useState(null)

  const setUserObject = (user_data) => {
    setUser(user_data)
  }

  const logout = () => {
    setUser(null)
    localStorage.clear()
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user")
    if (isLoggedIn) {
      const foundUser = JSON.parse(isLoggedIn);
      setUser(foundUser);
    }
  }, [])

  return (
    <Router>
      <Navbar user={user} logout={logout} />
      <Route path='/' exact>
        <Products />
      </Route>
      <Route path='/login'>
        <Login setUserObject={setUserObject} />
      </Route>
      <Route path='/person'>
        <Person />
      </Route>
      <Route path='/updateuser/:id'>
        <UpdateUser />
      </Route>
      <Route path='/adduser'>
        <AddUser />
      </Route>
      <Route path='/cart'>
        <Cart />
      </Route>
      <Route path='/wishlist'>
        <Wishlist />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/productlist'>
        <ProductList />
      </Route>
      <Route path='/updateproduct/:id'>
        <UpdateProduct />
      </Route>
      <Route path='/addproduct'>
        <AddProduct />
      </Route>
    </Router>
  );
}

export default App;
