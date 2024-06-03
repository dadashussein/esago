import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };
  const auth = useSelector((state) => state.auth.currentUser);
  //console.log(auth);
  let imgURl = `http://localhost:8000/static/profiles/${auth?.profile_picture}`;
  return (
    <div className="flex px-8 justify-around h-[80px] shrink-0  items-center   sticky bg-bg-primary ">
      <h1 className="text-primary-500 font-bold text-[25px]">Esago</h1>
      <div>
        <ul className="flex gap-4 text-primary-500">
          <li>Templates</li>
          <li>Filter</li>
          <li>Subscription</li>
        </ul>
      </div>
      <div className="flex gap-4">
        <Button textColor="primary-500">Sign In</Button>
        <Button bgColor="primary-500" textColor="white">
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Header;
