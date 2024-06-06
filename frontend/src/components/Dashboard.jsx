import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main/Main";
import { useDispatch } from "react-redux";
import { fetchEducation } from "~/store/features/education/educationThunks";
import { fetchExperience } from "~/store/features/experience/experienceThunks";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllData = () => {
      dispatch(fetchEducation());
      dispatch(fetchExperience());

    };
    fetchAllData();
    return () => {
      localStorage.removeItem("currentSection");
    };
  }, [dispatch]);


  return <div className="flex justify-center">
    <Main />
  </div>;
};

export default Dashboard;
