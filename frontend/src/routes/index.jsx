import { createBrowserRouter } from "react-router-dom";
import Inner from "../pages/inner";
import HomePage from "../pages/home/HomePage";
import Register from "../components/Register";
import MainLayout from "~/components/layouts/main";
import Templates from "~/components/Templates";
import CreateCv from "~/components/CreateCv";

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
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Inner />,
      },
      {
        path: "template",
        element: <Templates />,
      },
      {
        path: ":cvId",
        element: <CreateCv />,
      }
    ],
  },
]);

export default routes;
