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
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ThreadByIdPage from "./pages/ThreadByIdPage";
import ProfileMedia from "./pages/profile/ProfileMedia";
import ProfilePosts from "./pages/profile/ProfilePosts";
import Followlayout from "./features/follow/FollowLayout";
import FollowersPage from "./pages/follow/FollowersPage";
import FollowingPage from "./pages/follow/FollowingPage";
import NotFoundPage from "./pages/Notfound";
import ErrorPage from "./pages/ErrorPage";
import SuggestionPage from "./pages/SuggestionPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },

      {
        path: "/:username",
        element: <ProfilePage />,
        children: [
          { index: true, element: <ProfilePosts /> },
          { path: "media", element: <ProfileMedia /> },
        ],
      },
      {
        path: "/:username",
        element: <Followlayout />,
        children: [
          { path: "followers", element: <FollowersPage /> },
          { path: "following", element: <FollowingPage /> },
        ],
      },
      {
        path: "suggestions",
        element: <SuggestionPage />,
      },
      {
        path: "/:username/posts/:threadid",
        element: <ThreadByIdPage />,
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
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
