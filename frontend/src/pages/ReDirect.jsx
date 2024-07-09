import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ReDirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  useEffect(() => {
    if (data) {
      Cookies.set("accessToken", data.access_token);
      navigate("/app");
    } else {
      navigate("*");
    }
  }, [data, navigate]);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};

export default ReDirect;
