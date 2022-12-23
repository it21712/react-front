import axios from "../backend/axios";
import useAuth from "./useAuth";
import { REFRESH_URL } from "../backend/urls";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post(REFRESH_URL, {
            withCredentials: true
        });

        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log('new token: ' + response.data.access);
            return { ...prev, accessToken: response.data.access }
        });

        return response.data.access;
    }

    return refresh;
}

export default useRefreshToken;