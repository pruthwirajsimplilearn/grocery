import { useHistory } from "react-router";
const Unauthorized = () => {
    const history = useHistory()
    return ( 
    <div className="container" style={{textAlign:"center"}}>
            <h2 style={{"color":"red"}}>404 Page not found :(</h2><br/>
            <button className="btn btn-outline-primary" onClick={() => {history.push("/")}}>
                Back To Home Page
            </button>
    </div>
     );
}
 
export default Unauthorized;