import { Navigate, Outlet } from "react-router";
import { authStore } from "../context/auth"


export function ProtectedRoute() {

  const auth = authStore.getState().auth;

  if (!auth){
    return <Navigate to='/login' replace/>
  }

  return <Outlet/>
}