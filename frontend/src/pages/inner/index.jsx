import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import { useEffect } from "react";
import { getCurrentUser } from "../../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Inner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.currentUser);
  console.log(auth);
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (!auth) {
    navigate("/");
  }
  return (
    <div className="h-full dark:bg-gray-900">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
