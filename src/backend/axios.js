import axios from "axios";
import { BACKEND_URL, LOGOUT_URL } from "./urls";

import Cookies from "js-cookie";
export default axios.create({
    baseURL: BACKEND_URL,
    headers: {
        //'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
    },
    withCredentials: true
});

export const axios2 = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        //'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
    },
    withCredentials: true
});
