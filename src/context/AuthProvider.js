import { createContext, useState } from "react";
import { useLocalStorage } from "react-use-storage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const email = localStorage.getItem('email');
    const [auth, setAuth] = useState({
        email: email
    });



    //const [auth, setAuth, removeAuth] = useLocalStorage('email', null);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext; 