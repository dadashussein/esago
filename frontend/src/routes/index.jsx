import { createBrowserRouter } from "react-router-dom";
import Inner from "../pages/inner";
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
    element: <Inner />,
  },
  {
    path: "/app/dashboard/:cvId",
    element: <Dashboard />,
  },
]);

export default routes;
