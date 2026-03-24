import { useContext } from "react";
import { AuthContext } from "../Context";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const auth = useContext(AuthContext);

  if (!auth?.user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
