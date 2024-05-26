import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Inner from "../pages/inner";
import ActivationPage from "../components/ActivationPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/app",
    element: <Inner />,
  },
  {
    path: "/activation",
    element: <ActivationPage />,
  },
]);

export default routes;
