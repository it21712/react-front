import { LOGOUT_URL } from "../backend/urls";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
const useLogout = () => {
    const { setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    if (useAuth.accessToken) {
        axiosPrivate.post(LOGOUT_URL, { 'email': useAuth.email });
        setAuth({});

    }
}

export default useLogout;