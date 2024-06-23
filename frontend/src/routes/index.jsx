/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "@/components/common/Loading";
import HomePage from "@/pages/home/HomePage";
import Register from "@/components/auth/Register";
import Login from "@/components/auth/Login";
import GoogleCallback from "@/pages/GoogleCallback";
import ActivateUser from "@/pages/ActivateUser";
import MainLayout from "@/layouts/MainLayout";
import Inner from "@/pages/inner";
import Templates from "@/components/cv/Templates";
import CreateCv from "@/components/cv/CreateCv";
import Four04page from "@/pages/Four04page";
const getAccessToken = () => Cookies.get("accessToken");
const isAuthenticated = () => !!getAccessToken();

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const auth = isAuthenticated();
      setAuthenticated(auth);
      setLoading(false);
      if (!auth) {
        window.location.href = "/";
      }
    };
    checkAuth();
  }, [location]);

  if (loading) {
    return <Loading />;
  }

  return authenticated ? children : null;
};

const AuthenticatedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const auth = isAuthenticated();
      setAuthenticated(auth);
      setLoading(false);
      if (auth) {
        window.location.href = "/app";
      }
    };
    checkAuth();
  }, [location]);

  if (loading) {
    return <Loading />;
  }

  return authenticated ? null : children;
};

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
      { path: "template", element: <Templates /> },
      { path: ":cvId", element: <CreateCv /> },
    ],
  },
  { path: "*", element: <Four04page /> },
]);

export default routes;
