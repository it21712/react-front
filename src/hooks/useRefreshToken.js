import axios from "../backend/axios";
import useAuth from "./useAuth";
import { REFRESH_URL } from "../backend/urls";
import { useEffect } from "react";
import Cookies from "js-cookie";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post(REFRESH_URL, {
            withCredentials: true
        });

        setAuth(prev => {

            return { ...prev, accessToken: response.data.access }
        });

        return response.data.access;
    }

    return refresh;
}
const useRefreshToken2 = () => {
    const { auth, setAuth } = useAuth();
    useEffect(() => {

        const requestIntercept = axios.interceptors.request.use(

            config => {
                config.headers['X-CSRFToken'] = `${Cookies.get('csrftoken')}`;
                if (!config.headers['Authorization']) {

                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;

                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {

                    return axios(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axios.interceptors.request.eject(requestIntercept);
            axios.interceptors.response.eject(responseIntercept);
        }
    }, []);
    const refresh = async () => {
        const response = await axios.post(REFRESH_URL, {
            withCredentials: true
        });

        setAuth(prev => {

            return { ...prev, accessToken: response.data.access }
        });

        return response.data.access;
    }

    return refresh;
}

export default useRefreshToken;