
import { useEffect } from "react";
import useAuth from "./useAuth";
import Cookies from "js-cookie";

import { LOGOUT_URL } from "../backend/urls";

import useAxiosPrivate from "./useAxiosPrivate";


const useAxiosRole = () => {
    const { auth, setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const forceLogout = () => {
        axiosPrivate.post(LOGOUT_URL);
        setAuth({});
        localStorage.removeItem('email');
        localStorage.removeItem('profilePic');
        localStorage.removeItem('profilePicUrl');
        localStorage.removeItem('profilePicName');
        localStorage.removeItem('details');
        localStorage.removeItem('uploads');
    }

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                config.headers['X-CSRFToken'] = `${Cookies.get('csrftoken')}`;
                if (!config.headers['Authorization']) {

                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;

                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response.status === 401 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    console.warn('refresh expired, logging out');
                    forceLogout();

                } else if (error?.response.status === 403 && !prevRequest.sent && error?.response.data.detail === 'Uncompleted Details') {
                    console.warn('Please complete your profile details before continuing');
                }
                //todo add 403 Forbidden interceptor

                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, []);

    return axiosPrivate;
}


export default useAxiosRole;