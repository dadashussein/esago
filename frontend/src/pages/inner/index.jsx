import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Main from "../../components/Main/Main";
import { useEffect } from "react";
import { getCurrentUser, logout } from "../../store/features/auth/authSlice";
import { fetchEducation } from "../../store/features/education/educationThunks";
import Dashboard from "~/components/Dashboard";
import { useNavigate } from "react-router-dom";
import Hero from "~/components/Hero";

export default function Inner() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    console.log('handled');
  };

  const auth = useSelector((state) => state.auth.currentUser);
  console.log(auth);
  let imgURl = `http://localhost:8000/static/profiles/${auth?.profile_picture}`;

  return (
    <div className="h-full dark:bg-gray-900">
      <Header auth={auth} handleLogout={handleLogout} img={imgURl} />
      <Hero />
      <Footer />
    </div>
  );
}
