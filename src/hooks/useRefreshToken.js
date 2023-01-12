import axios from "../backend/axios";
import useAuth from "./useAuth";
import { LOGOUT_URL, REFRESH_URL } from "../backend/urls";
import { useEffect } from "react";
import Cookies from "js-cookie";
import useAxiosPrivate from "./useAxiosPrivate";

const useRefreshToken1 = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        await axios.post(REFRESH_URL, {
            withCredentials: true
        }).then((response) => {
            setAuth(prev => {
                return { ...prev, accessToken: response.data.access }
            });
            return response.data.access;
        }).catch(error => {
            if (error.status === 401) {
                console.log('refresh expired (useRefresh)');
                return null;
            }
        });
    }

    return refresh;
}

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
                    prevRequest.sent = true;
                    console.log('refresh expired');
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