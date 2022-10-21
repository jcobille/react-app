import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "./components/misc/cookie";
import Tabs from "./components/nav/Tabs";

const ProtectedRoute = ({ children }) => {
    const cookie = getCookie('token');
    if (!cookie) return <Navigate to="/" />;
    return <>
        <Tabs />
        <Outlet />
    </>;
}

export default ProtectedRoute;