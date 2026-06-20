import { Navigate } from "react-router-dom";
import { useEffect } from "react";

import React from 'react'

const ProtectedRoute = ({children}) => {
  const token = sessionStorage.getItem('token')
  if(!token){
    return <Navigate to='/login' replace />
  }
  return children
}

export default ProtectedRoute
