import useAdmin from "../hooks/useAdmin";

import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/shared/Loading";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  if (loading || isAdminLoading) {
    return <Loading></Loading>; // Optionally, you can show a loading spinner or message
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default AdminRoute;
