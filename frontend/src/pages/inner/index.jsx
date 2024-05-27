import { useDispatch } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import Main from "../../components/Main/Main";
import { useEffect } from "react";
import { getCurrentUser } from "../../store/features/auth/authSlice";


export default function Inner() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="h-full dark:bg-gray-900">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
