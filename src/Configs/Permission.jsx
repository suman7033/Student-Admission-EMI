import React from "react";
import { Navigate } from "react-router-dom";

const Permissions = ({ children, permission }) => {
  // const {user}=useSelector(state=>state.auth);
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("User Data", user?.menuPermission);
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/login"} />;
  } else if (user?.menuPermission?.includes(permission)) {
    return children;
  }
};

export default Permissions;
