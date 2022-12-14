import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function AdminRouteProtector() {
  console.log("hiee banda chuke magia cjodia pua randi gandi")
  const isAuthorised = useSelector(state => {
    return state?.user?.admin
  });

  return (
    isAuthorised ? <Outlet /> : <Navigate to="/" />
  )
}

export default AdminRouteProtector