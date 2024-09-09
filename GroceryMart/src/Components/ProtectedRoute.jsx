import { Navigate, Outlet } from "react-router-dom";

const Protectedroute = () => {
  const isAuthenticated = !!localStorage.getItem("token"); //

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/" replace />
      {alert("Not allowed to access this page. Please login first.")}
    </>
  );
};

export default Protectedroute;
