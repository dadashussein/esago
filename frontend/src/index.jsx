import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index.jsx";
import ShowUpProvider from "./context/ShowSignUpContext.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import CvInputProvider from "./context/CvInputContext.jsx";
import EducationProvider from "./context/EducationContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ShowUpProvider>
      <UserContextProvider>
        <CvInputProvider>
          <EducationProvider>
            <RouterProvider router={routes} />
          </EducationProvider>
        </CvInputProvider>
      </UserContextProvider>
    </ShowUpProvider>
  </AuthProvider>
);
