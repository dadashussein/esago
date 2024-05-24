import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Inner from "../pages/inner";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/app",
    element: <Inner />,
  },
]);

export default routes;
