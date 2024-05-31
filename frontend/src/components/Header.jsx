import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };
  const auth = useSelector((state) => state.auth.currentUser);
  //console.log(auth);
  let imgURl = `http://localhost:8000/static/profiles/${auth?.profile_picture}`
  return (
    <div className="flex justify-between items-center p-[1rem] border-b sticky ">
      <div className="logo">esago</div>

      <div className="flex items-center justify-center gap-8">
        <h1 className="border p-2 rounded">Hi, {auth?.first_name}</h1>
        <img
          src={imgURl}
          alt="profile"
          className="w-12 h-12 rounded-full object-fill"
        />
        <div className="flex items-center justify-center">
          <button className="btn-secondary" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
