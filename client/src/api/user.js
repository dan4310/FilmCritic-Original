import axios from "axios"
import reportWebVitals from "../reportWebVitals";

const fetchLogin = async (username, password) => {
    await axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                console.log(response.data.message);
            } else {
                console.log(response.data);
            }
        });
}

export default { fetchLogin };