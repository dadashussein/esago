import { createBrowserRouter } from "react-router-dom";
import Inner from "../pages/inner";
import ActivationPage from "../components/ActivationPage";
import ProtectedRoute from "../components/ProtectedRoute";

import HomePage from "../pages/home/HomePage";
import Register from "../components/Register";
import Dashboard from "~/components/Dashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/app",
    element: (
      // <ProtectedRoute>
      // </ProtectedRoute>
      <Inner />
    ),
  },
  {
    path: "/app/*",
    element: (
      // <ProtectedRoute>
      // </ProtectedRoute>
      <Dashboard />
    ),
  },
  {
    path: "users/activate/:userId:token",
    element: <ActivationPage />,
  },
]);

export default routes;
