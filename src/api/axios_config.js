import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:9090/v1",
    headers: {
        "Content-Type": "application/json",
    },
});
