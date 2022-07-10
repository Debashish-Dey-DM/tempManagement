import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    return localStorage.getItem("email") || localStorage.getItem("name") ? (
      <Outlet />
    ) : (
      <Navigate to="/Authentication/Login" />
    );
  };

export default PrivateRoute;