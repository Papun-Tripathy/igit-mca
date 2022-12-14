import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

function AuthorisedRoute() {
    const isAuthorised = useSelector(state => state?.auth?.isVerifyed);

    if (!isAuthorised) {
        toast.info('You are not verifyed yet!....', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    return (
        isAuthorised ? <Outlet /> : <Navigate to="/fill-details" />
    )
}

export default AuthorisedRoute