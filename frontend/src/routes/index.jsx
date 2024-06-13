import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
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

const getAccessToken = () => Cookies.get('accessToken');
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
  { path: "/", element: <AuthenticatedRoute><HomePage /></AuthenticatedRoute> },
  { path: "/signup", element: <Register /> },
  { path: "/google/authenticate", element: <GoogleCallback /> },
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
  { path: "*", element: <h1>404</h1> },
]);

export default routes;
