import {Outlet, Navigate} from "react-router-dom"
import { useSelector } from "react-redux"

function ProtectedRoute() {
    const isLoggedIn = useSelector(state => {
        console.log(state)
        return state.auth.isLoggedIn
    })
  return (
    isLoggedIn ? <Outlet /> : <Navigate to="/login" />
  )
}

export default ProtectedRoute