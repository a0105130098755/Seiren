import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, isAuthenticated, ...rest }) => {
  if (!isAuthenticated) {
    alert("로그인을 먼저 해주세요~.");
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
