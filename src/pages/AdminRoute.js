import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function AdminRouteProtector() {
  const isAuthorised = useSelector(state => {
    console.log("hiee banda chuke magia cjodia pua randi gandi")
    return state?.user?.admin
  });

  return (
    isAuthorised ? <Outlet /> : <Navigate to="/" />
  )
}

export default AdminRouteProtector