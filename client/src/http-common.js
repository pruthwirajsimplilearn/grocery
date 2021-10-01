import axios from "axios";

export default axios.create({
    baseURL: "http://192.168.43.93:5000/api/grocery_store",
    headers: {
        "Content-type" : "application/json"
    }
});