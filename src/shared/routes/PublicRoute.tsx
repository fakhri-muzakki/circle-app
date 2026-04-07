import { Navigate } from "react-router";
import { useAppSelector } from "../hooks/redux";

const PublicRoute = ({ children }: React.PropsWithChildren) => {
  const user = useAppSelector((state) => state.auth.user);

  if (user) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default PublicRoute;
