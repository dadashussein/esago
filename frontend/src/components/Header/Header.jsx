import "./header.css";
import Navbar from "../Navbar/Navbar";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="header">
      <div className="logo">esago</div>
      <Navbar />
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Header;
