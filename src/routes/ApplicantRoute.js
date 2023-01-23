import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import useAxiosRole from "../hooks/useAxiosRole";

import VerifyEmailPage from "../screens/VerifyEmailPage";
import UnauthorizedPage from "../screens/UnauthorizedPage";

//todo check loading state
const RequireVerify = () => {

    const axiosRole = useAxiosRole();
    const [verified, setVerified] = useState(null);
    useEffect(() => {
        axiosRole.get('/applicants/verified/').then((response) => {
            setVerified(true);
        }).catch(error => setVerified(false));
    }, []);

    return (
        verified === null ? <></> : verified
            ? <Outlet />
            : <VerifyEmailPage />
    );
}


export default RequireVerify;