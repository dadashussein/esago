import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Inner from "../pages/inner";
import SignIn from "../components/SignIn/SignIn";

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
    path: "/login",
    element: <SignIn />,
  }
]);

export default routes;
