import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { loginRoute } from "../routes";
const RequireAuth = () => {

    const { auth } = useAuth();
    const location = useLocation();
    return (
        auth?.email
            ? <Outlet />
            : <Navigate to={loginRoute} state={{ from: location }} replace />
    );
}

export default RequireAuth;