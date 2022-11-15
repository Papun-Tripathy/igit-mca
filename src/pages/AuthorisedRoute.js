import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function AuthorisedRoute() {
    const isAuthorised = useSelector(state => {
        console.log(state)
        return state.auth.isVerifyed
    })
    if(!isAuthorised){
        
    }
    return (
        isAuthorised ? <Outlet /> : <Navigate to="/fill-details" />
    )
}

export default AuthorisedRoute