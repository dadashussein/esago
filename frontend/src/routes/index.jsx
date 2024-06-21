/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Inner from "../pages/inner";
import HomePage from "../pages/home/HomePage";
import Register from "../components/Register";
import MainLayout from "~/components/layouts/main";
import Templates from "~/components/Templates";
import CreateCv from "~/components/CreateCv";
import GoogleCallback from "~/pages/GoogleCallback";
import ActivateUser from "~/pages/ActivateUser";
import Cookies from "js-cookie";
import Loading from "~/components/Loading";
import Login from "~/components/Login";
import Four04page from "~/components/Four04page";

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
