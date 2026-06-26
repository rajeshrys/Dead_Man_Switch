import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authcontext";

const ProtectedRoute = ({children}) => {
  const { user, authChecked } = useContext(AuthContext)

  if (!authChecked) {
    return <div className="flex items-center justify-center min-h-screen"><p className="text-gray-500 text-lg">Loading...</p></div>
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default ProtectedRoute
