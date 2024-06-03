import { useDispatch } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Main from "../../components/Main/Main";
import { useEffect } from "react";
import { getCurrentUser } from "../../store/features/auth/authSlice";
import { fetchEducation } from "../../store/features/education/educationThunks";
import Main2 from "~/components/Main/Main2";

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

  return (
    <div className="h-full dark:bg-gray-900">
      <Header />
      {/* <Main /> */}
      <Main2 />
      <Footer />
    </div>
  );
}
