import { useEffect, useState } from "react";
import Experience from "./Leftside/Sections/Experience";
import Skill from "./Leftside/Sections/Skill";
import Rightside from "../Rightside";
import Personal from "./Leftside/Sections/Personal";
import Education from "./Leftside/Sections/Education";
import Button from "../Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchEducation } from "~/store/features/education/educationThunks";

const Main = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cvId } = useParams();

  useEffect(() => {
    dispatch(fetchEducation({ cvId }));
    //dispatch(fetchExperience());
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
      component: <Experience setActiveTab={setActiveTab} />,
    },
    {
      name: "Skills",
      component: <Skill setActiveTab={setActiveTab} />,
    },
  ];
  useEffect(() => {
    localStorage.setItem("currentSection", activeTab);
  }, [activeTab]);

  return (
    <div className="h-screen flex justify-center">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <h1 className="text-[32px]">Let’s create your first resume!</h1>
          <p>Fill the inputs, please.</p>
        </div>
        <div className="flex flex-col gap-16 sm:flex-row">
          {/* leftide */}
          <div className="max-w-[35rem]">
            <div className="flex">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center justify-center w-[10rem] h-[50px]  cursor-pointer ${
                    activeTab === index ? "border-b-2 border-primary-500" : ""
                  }`}
                >
                  {tab.name}
                </div>
              ))}
            </div>
            <div className="">{tabs[activeTab].component}</div>
          </div>
          {/* right side */}
          <div className="border-[20px] h-[40rem] border-primary-500 rounded-2xl">
            <Rightside />
          </div>
        </div>

        <div>
          <button onClick={handleBack}>exit</button>

          <Button textColor="white" bgColor="primary-500">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Main;
