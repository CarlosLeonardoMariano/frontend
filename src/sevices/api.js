import axios from "axios";


export const api = axios.create({
    baseURL: "https://backend-1-sfq3.onrender.com"
})

export {api};