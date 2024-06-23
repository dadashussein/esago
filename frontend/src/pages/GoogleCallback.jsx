import Cookies from "js-cookie";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("access_token");
    if (token) {
      Cookies.set("accessToken", token);
      navigate("/app");
    }
  }, [location.search, navigate]);

  return <div>Wait</div>;
};

export default GoogleCallback;
