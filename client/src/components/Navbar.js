import { Link } from "react-router-dom";

const Navbar = ({ user, logout }) => {


  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <span className="navbar-nav mr-auto" style={{ marginLeft: "2%" }}>
          <Link to='/' className="nav-link active" aria-current="page" >
            <h3>BAMAZON</h3>
          </Link>
        </span>
        <button className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          ria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mr-auto">
            <div>
              {user && user.type === "admin" ?
                <Link to='/person' className="nav-link">ADMIN DASHBOARD</Link> :
                <span></span>}
            </div>
            <div>
              {user && user.type === "user" ?
                <Link to='/cart' className="nav-link">Cart</Link> :
                <div></div>}
            </div>
            <div>
              {user && user.type === "user" ?
                <Link to='/wishlist' className="nav-link">WishList</Link> :
                <div></div>}
            </div>

          </div>

          <div style={user ?
            { marginLeft: "74%", float: "right" } :
            { marginLeft: "90%", float: "right" }}>
            {user ?
              <Link to='/'>
                <button className="btn btn-outline-danger" type="submit" onClick={logout}>Logout {user.name}</button>
              </Link> :
              <Link to="/login">
                <button className="btn btn-outline-success" type="submit">Login</button>
              </Link>
            }
          </div>
        </div>
      </nav>

    </div>
  );
}

export default Navbar;