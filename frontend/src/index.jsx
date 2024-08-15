import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index.jsx";
import { store } from "./store/store.js";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer
      style={{ fontSize: '14px', fontFamily: 'Inter' }}
      richColors={true}
      position="top-right"
    />{' '}
    <RouterProvider router={routes} />
  </Provider>,
);
