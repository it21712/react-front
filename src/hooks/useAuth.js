import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useLocalStorage } from "react-use-storage";
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;