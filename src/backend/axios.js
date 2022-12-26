import axios from "axios";
import { BACKEND_URL, LOGOUT_URL } from "./urls";
import useAuth from "../hooks/useAuth";
export default axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});
