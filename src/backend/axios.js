import axios from "axios";
import { BACKEND_URL } from "./urls";

export default axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});