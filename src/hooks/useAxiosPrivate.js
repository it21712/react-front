import { axios2 } from "../backend/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { loginRoute, unauthorizedRoute, verifyEmailRoute } from "../routes";
import { unverifiedMessage } from "../strings";
import Cookies from "js-cookie";
import { APPLICANT_DETAILS_URL, LOGOUT_URL } from "../backend/urls";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const forceLogout = () => {
        axios2.post(LOGOUT_URL);
        setAuth({});
        localStorage.removeItem('email');
        localStorage.removeItem('profilePic');
        localStorage.removeItem('profilePicUrl');
        localStorage.removeItem('profilePicName');
        localStorage.removeItem('details');
    }

    useEffect(() => {

        const requestIntercept = axios2.interceptors.request.use(


            config => {

                config.headers['X-CSRFToken'] = `${Cookies.get('csrftoken')}`;

                if (!config.headers['Authorization']) {

                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;

                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axios2.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    if (!newAccessToken) {
                        console.warn('redfresh expired, loggin out');
                        forceLogout();
                        return axios2(prevRequest);
                    }

                    console.log('got new Access ' + newAccessToken);
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;



                    return axios2(prevRequest);
                }
                // if (error?.response?.status === 403 && !prevRequest?.sent) {

                //     prevRequest.sent = true;
                //     const newAccessToken = await refresh();

                //     prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                //     return axiosPrivate(prevRequest);

                // }

                return Promise.reject(error);
            }
        );

        return () => {
            axios2.interceptors.request.eject(requestIntercept);
            axios2.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh])
    return axios2;
}

// export const useAxiosRole = () => {
//     const refresh = useRefreshToken();
//     const { auth, setAuth } = useAuth();
//     const navigate = useNavigate();

//     const triggerLogout = () => {
//         axiosPrivate.post(LOGOUT_URL);
//         setAuth({});
//         localStorage.removeItem('email');
//         localStorage.removeItem('profilePic');
//         localStorage.removeItem('profilePicUrl');
//         localStorage.removeItem('profilePicName');
//         localStorage.removeItem('details');
//     }

//     useEffect(() => {

//         const requestIntercept = axiosPrivate.interceptors.request.use(


//             config => {
//                 config.headers['X-CSRFToken'] = `${Cookies.get('csrftoken')}`;
//                 if (!config.headers['Authorization']) {

//                     config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;

//                 }
//                 return config;
//             }, (error) => Promise.reject(error)
//         );

//         const responseIntercept = axiosPrivate.interceptors.response.use(
//             response => response,
//             async (error) => {
//                 const prevRequest = error?.config;
//                 if (error?.response?.status === 401) {
//                     //triggerLogout();
//                     //navigate(unauthorizedRoute);
//                 } else if (error.response?.status === 403 && !prevRequest?.sent) {
//                     prevRequest.sent = true;
//                     const newAccessToken = await refresh();
//                     prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                     console.log(newAccessToken);
//                     return axiosPrivate(prevRequest);
//                 } else if (error?.response?.status === 403 && error?.response?.data['detail'] === unverifiedMessage) {
//                     navigate(verifyEmailRoute);
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             axiosPrivate.interceptors.request.eject(requestIntercept);
//             axiosPrivate.interceptors.response.eject(responseIntercept);
//         }

//     }, [auth, refresh])
//     return axiosPrivate;
// }

export const useAxiosRole = () => {
    //const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    //const axios2Role = axios2;


    useEffect(() => {

        const requestIntercept = axios2.interceptors.request.use(


            config => {
                config.headers['X-CSRFToken'] = `${Cookies.get('csrftoken')}`;
                if (!config.headers['Authorization']) {

                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;

                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axios2.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;

                if (error?.response?.status === 403 && error?.response?.data['detail'] === unverifiedMessage) {
                    navigate(verifyEmailRoute);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios2.interceptors.request.eject(requestIntercept);
            axios2.interceptors.response.eject(responseIntercept);
        }

    }, []) //[auth, refresh]
    return axios2;
}


export default useAxiosPrivate;
