import { Navigate } from "react-router";
import { useAppSelector } from "../hooks/redux";

const PrivateRoute = ({ children }: React.PropsWithChildren) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default PrivateRoute;
