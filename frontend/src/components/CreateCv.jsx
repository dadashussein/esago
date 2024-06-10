import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Personal from "./Main/Leftside/Sections/Personal";
import Education from "./Main/Leftside/Sections/Education";
import Experience from "./Main/Leftside/Sections/Experience";
import Skill from "./Main/Leftside/Sections/Skill";
import Button from "./Button";
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

    <div className="bg-gray-200 ">

      <div className="flex">
        {/* leftide */}
        <div className="w-1/2 bg-white p-8">
          <div className="flex">
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center justify-center w-[10rem] h-[50px]  cursor-pointer ${activeTab === index ? "border-b-2 border-primary-500" : ""
                  }`}
              >
                {tab.name}
              </div>
            ))}
          </div>
          <div className="">{tabs[activeTab].component}</div>
        </div>
        {/* right side */}
        <div className="w-1/2 bg-green-100 p-8">
          <A4Component />
        </div>
      </div>

    </div>

  );
};

export default CreateCv;
