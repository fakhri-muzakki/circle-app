import { createBrowserRouter } from "react-router";
import MainLayout from "./shared/layouts/main/MainLayout";
import Home from "./pages/Home";
import AuthLayout from "./shared/layouts/AuthLayout";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPassword from "./pages/auth/ResetPasswordPage";
import OAuthSuccess from "./pages/OAuthSuccess";
import PrivateRoute from "./shared/routes/PrivateRoute";
import PublicRoute from "./shared/routes/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        // loader: async () => {
        //   const result = await fetchData({
        //     url: "http://localhost:3000/api/threads",
        //   });
        //   return result;
        // },
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/oauth-success",
    element: <OAuthSuccess />,
  },
  {
    path: "/",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
]);

export default router;
