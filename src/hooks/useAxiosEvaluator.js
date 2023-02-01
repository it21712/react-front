import Cookies from "js-cookie";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useAxiosEvaluator = () => {
    const { auth, setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();


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


                }

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

export default useAxiosEvaluator;