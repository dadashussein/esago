import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import { useState } from "react";
import Login from "./Login";

const Header = ({ login, setLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };
  const auth = useSelector((state) => state.auth.currentUser);

  return (
    <div className="flex justify-between items-center p-[1rem] border-b sticky ">
      <div className="logo">esago</div>

      <div className="flex items-center justify-center gap-8">
        <h1 className="border p-2 rounded">Hi, {auth?.full_name}</h1>
        <div className="flex items-center justify-center">
          <button className="btn-secondary" onClick={() => setLogin(!login)}>
            Login
          </button>
          <button className="btn-secondary" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
