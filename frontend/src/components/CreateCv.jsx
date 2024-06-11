import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Personal from "./Main/Leftside/Sections/Personal";
import Education from "./Main/Leftside/Sections/Education";
import Experience from "./Main/Leftside/Sections/Experience";
import Skill from "./Main/Leftside/Sections/Skill";
import Preview from "./Preview";
import { fetchEducation } from "~/store/features/education/educationThunks";
import { fetchExperience } from "~/store/features/experience/experienceThunks";
import { getSkills } from "~/store/features/skills/skillsThunks";
import A4Component from "./A4";

const CreateCv = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cvId } = useParams();

  useEffect(() => {
    dispatch(fetchEducation({ cvId }));
    dispatch(fetchExperience({ cvId }));
    dispatch(getSkills({ cvId }))
  }, [dispatch, cvId]);

  const handleBack = () => {
    navigate("/app");
  };

  const tabs = [
    {
      name: "Contact",
      component: <Personal cvId={cvId} setActiveTab={setActiveTab} />,
    },
    {
      name: "Education",
      component: <Education cvId={cvId} setActiveTab={setActiveTab} />,
    },
    {
      name: "Experience",
      component: <Experience cvId={cvId} setActiveTab={setActiveTab} />,
    },
    {
      name: "Skills",
      component: <Skill cvId={cvId} setActiveTab={setActiveTab} />,
    },
  ];
  useEffect(() => {
    localStorage.setItem("currentSection", activeTab);
  }, [activeTab]);

  return (
    <div className="flex lg:flex-row sm:flex-col items-center  ">
      {/* leftide */}
      <div className="lg:w-1/2 h-screen  px-4 py-8  m-1 drop-shadow-xl dark:bg-[#232429] bg-white">
        <div className="flex gap-2">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex border-b-4 w-full text-gray-900 dark:text-[#D4D4D4]    items-center justify-center  cursor-pointer 
                ${activeTab === index ? "border-b-2 border-primary-500 dark:border-primary-400" : ""
                }`}
            >
              {tab.name}
            </div>
          ))}
        </div>
        <div className="px-4 py-2">{tabs[activeTab].component}</div>
      </div>
      {/* right side */}
      <div className="w-1/2 h-screen">
        <A4Component />
      </div>
    </div>
  );
};

export default CreateCv;
