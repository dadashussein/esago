import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Personal from "./Main/Leftside/Sections/Personal";
import Education from "./Main/Leftside/Sections/Education";
import Experience from "./Main/Leftside/Sections/Experience";
import Skill from "./Main/Leftside/Sections/Skill";
import { fetchEducation } from "~/store/features/education/educationThunks";
import { fetchExperience } from "~/store/features/experience/experienceThunks";
import { getSkills } from "~/store/features/skills/skillsThunks";
import A4Component from "./A4";
import { MapInteractionCSS } from "react-map-interaction";
import Templates from "./Templates";
import { compileToHtml } from "~/store/features/compileHtmlSlice";
import Preview from "./Preview";
import { jsPDF } from 'jspdf';
import { useReactToPrint } from "react-to-print";

const CreateCv = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [finished, setFinished] = useState(false);
  const activeTemplate = useSelector((state) => state.templates.activeTemplate);
  const componentRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cvId } = useParams();


  useEffect(() => {
    dispatch(fetchEducation({ cvId }));
    dispatch(fetchExperience({ cvId }));
    dispatch(getSkills({ cvId }));
  }, [dispatch, cvId]);

  const handleBack = () => {
    if (activeTab === 0) {
      navigate("/app");
    } else {
      setActiveTab((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (activeTab === 3) {
      setFinished(true);
    } else {
      setActiveTab((prev) => prev + 1);
    }
  };

  const handleGenerate = () => {
    // const pdf = new jsPDF();
    // pdf.html(document.getElementById("print"), {
    //   callback: function (pdf) {
    //     pdf.save("cv.pdf");
    //   },
    // });
    console.log(componentRef.current);
  };

  const tabs = [
    {
      name: "Contact",
      component: (
        <Personal
          cvId={cvId}
          setActiveTab={setActiveTab}
          activeTemplate={activeTemplate}
        />
      ),
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

  return (
    <div className="flex lg:flex-row sm:flex-col ">
      {/* Left Side */}
      <div className="lg:w-1/2 max-w-[50rem] h-screen relative px-4 py-8 drop-shadow-xl dark:bg-[#232429] bg-white">
        <div className="flex gap-2">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex border-b-4 w-full text-gray-900 dark:text-[#D4D4D4] items-center justify-center cursor-pointer 
                ${activeTab === index ? "border-b-2 border-primary-500 dark:border-primary-400" : ""}`}
            >
              {tab.name}
            </div>
          ))}
        </div>
        <div className="px-4 py-2">{tabs[activeTab].component}</div>
        <div className="absolute bottom-[50px] right-[50px] flex gap-4">
          <button
            className="button-primary bg-primary-300 text-primary-500"
            onClick={handleBack}
          >
            Back
          </button>
          <button onClick={handleSubmit} className="button-primary">
            {finished ? "Submit" : "Next"}
          </button>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex   ">
        <div className=" border bg-emerald-50   h-screen hidden sm:block">
          <MapInteractionCSS
            showControls
            defaultValue={{ scale: 0.6, translation: { x: 30, y: 20 } }}
            minScale={0.5}
            maxScale={3}
            translationBounds={{ xMax: 700, yMax: 700 }}
          >
            <div ref={componentRef}>
              <A4Component onGenerate={handleGenerate} cvId={cvId} activeTemplate={activeTemplate} />
            </div>
          </MapInteractionCSS>
        </div>

        {/* <button onClick={handleGenerate} className="absolute bottom-12 right-40">
          Generate
        </button> */}
        <div className="">
          <Templates cvId={cvId} />
        </div>
      </div>
    </div>
  );
};

export default CreateCv;
