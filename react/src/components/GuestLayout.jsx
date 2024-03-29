import {useStateContext} from "../contexts/ContextProvider.jsx";
import {Navigate, Outlet} from "react-router-dom";

export default function GuestLayout() {
    const {token} = useStateContext()
    if (token) {
        return <Navigate to="/" />
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <Outlet />
            </div>
        </div>
    )
}
