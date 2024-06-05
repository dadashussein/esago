import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Main from "../../components/Main/Main";
import { useEffect } from "react";
import { getCurrentUser, logout } from "../../store/features/auth/authSlice";
import { fetchEducation } from "../../store/features/education/educationThunks";
import Dashboard from "~/components/Dashboard";
import { useNavigate } from "react-router-dom";

export default function Inner() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    const fetchAllData = () => {
      const token = localStorage.getItem("accessToken");
      dispatch(fetchEducation(token));
    };
    fetchAllData();
    return () => {
      localStorage.removeItem("currentSection");
    };
  }, [dispatch]);


  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };
  const auth = useSelector((state) => state.auth.currentUser);
  console.log(auth);
  let imgURl = `http://localhost:8000/static/profiles/${auth?.profile_picture}`;

  return (
    <div className="h-full dark:bg-gray-900">
      <Header auth={auth} />
      <Dashboard />
      <Main />
      <Footer />
    </div>
  );
}
