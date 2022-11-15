import {Outlet, Navigate} from "react-router-dom"
import { useSelector } from "react-redux"

function ProtectedRoute() {
    const isAuthorised = useSelector(state => {
        console.log(state)
        return state.auth.isLoggedIn
    })
  return (
    isAuthorised ? <Outlet /> : <Navigate to="/register" />
  )
}

export default ProtectedRoute