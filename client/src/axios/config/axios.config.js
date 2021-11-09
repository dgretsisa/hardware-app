import axios from 'axios'

const API = axios.create({
    baseURL: "/",
    responseType: "json",
    headers: { authorization: JSON.parse(localStorage.getItem("token")) }
});

export default API;