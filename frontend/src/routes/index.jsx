/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import HomePage from "@/pages/home/HomePage";
import Register from "@/components/auth/Register";
import Login from "@/components/auth/Login";
import GoogleCallback from "@/pages/GoogleCallback";
import ActivateUser from "@/pages/ActivateUser";
import MainLayout from "@/layouts/MainLayout";
import Inner from "@/pages/inner";
import CreateCv from "@/components/cv/CreateCv";
import Four04page from "@/pages/Four04page";
import ReDirect from "@/pages/ReDirect";

const getAccessToken = () => Cookies.get("accessToken");
const isAuthenticated = () => !!getAccessToken();

const AuthRoute = ({ children, redirectPath, checkAuth }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = isAuthenticated();
    setAuthenticated(auth);
    if (checkAuth(auth)) {
      navigate(redirectPath);
    }
  }, [navigate]);

  return authenticated === checkAuth(true) ? null : children;
};

const ProtectedRoute = ({ children }) => (
  <AuthRoute checkAuth={(auth) => !auth} redirectPath="/">
    {children}
  </AuthRoute>
);

const AuthenticatedRoute = ({ children }) => (
  <AuthRoute checkAuth={(auth) => auth} redirectPath="/app">
    {children}
  </AuthRoute>
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <HomePage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedRoute>
        <Register />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthenticatedRoute>
        <Login />
      </AuthenticatedRoute>
    ),
  },
  { path: "/authenticate_google", element: <GoogleCallback /> },
  { path: "/redirect", element: <ReDirect /> },
  { path: "/activate", element: <ActivateUser /> },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Inner /> },
      { path: ":cvId", element: <CreateCv /> },
    ],
  },
  { path: "*", element: <Four04page /> },
]);

export default routes;
