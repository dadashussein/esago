import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ReDirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state;
  useEffect(() => {
    if (data) {
      Cookies.set("accessToken", data.access_token);
      navigate("/app");
    }
  }, [navigate, location, data]);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};

export default ReDirect;
