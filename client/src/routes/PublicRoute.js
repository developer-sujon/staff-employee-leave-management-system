//External Lib Import
import { useSelector } from "react-redux";

//Internal Lib Import
import { Navigate } from "react-router-dom";

const PublicRoute = ({ component: RouteComponent, ...rest }) => {
  const { AccessToken } = useSelector((state) => state.Auth);

  return !AccessToken ? <RouteComponent /> : <Navigate to="/dashboard" />;
};

export default PublicRoute;
