import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Personal from "./Main/Leftside/Sections/Personal";
import Education from "./Main/Leftside/Sections/Education";
import Experience from "./Main/Leftside/Sections/Experience";
import Skill from "./Main/Leftside/Sections/Skill";
import { fetchEducation } from "~/store/features/education/educationThunks";
import { fetchExperience } from "~/store/features/experience/experienceThunks";
import { getSkills } from "~/store/features/skills/skillsThunks";
import { MapInteractionCSS } from "react-map-interaction";
import Templates from "./Templates";
import A4Component from "./A4";
import useCompileHtml from "~/hooks/useCompileHtml";
import { store } from "~/store/store";
import { Tailwind } from "@fileforge/react-print";
import { ChevronFirst, ChevronLast, FolderDown, Home } from "lucide-react";




const CreateCv = () => {
  const activeTemplate = useSelector((state) => state.templates.activeTemplate);
  const [expanded, setExpanded] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cvId } = useParams();
  const { compileToHtml, loading } = useCompileHtml({ cvId });


  useEffect(() => {
    dispatch(fetchEducation({ cvId }));
    dispatch(fetchExperience({ cvId }));
    dispatch(getSkills({ cvId }));
  }, [dispatch, cvId]);

  const handleGenerate = () => {
    compileToHtml(
      <Provider store={store}>
        <Tailwind>
          <A4Component activeTemplate={activeTemplate} cvId={cvId} />
        </Tailwind>
      </Provider>
    )
  };



  return (
    <div className="flex h-screen bg-white flex-col md:flex-row  ">
      {/* Left Side */}
      <div className={`relative sm:w-full  dark:bg-[#232429] ${expanded ? "lg:w-2/5" : "lg:w-1/2"}  `}>
        <div id="scrollbar1" className="p-4  flex flex-col gap-6 h-full overflow-y-scroll scroll-smooth">
          <Personal cvId={cvId}
            activeTemplate={activeTemplate} />
          <hr />
          <Education cvId={cvId} />
          <hr />
          <Experience cvId={cvId} />
          <hr />
          <Skill cvId={cvId} />
        </div>

      </div>
      {/* center*/}
      <div className={`relative transition duration-150  hidden md:block  ${expanded ? "w-2/5" : "w-1/2"} `}>
        <MapInteractionCSS
          showControls
          defaultValue={{ scale: 0.6, translation: { x: 30, y: 20 } }}
          minScale={0.5}
          maxScale={3}
          translationBounds={{ xMax: 700, yMax: 700 }}
        >
          <div className="border">
            <A4Component activeTemplate={activeTemplate} cvId={cvId} />
          </div>
        </MapInteractionCSS>
        <div className="border rounded-md bg-white px-4   absolute left-[40%] items-center bottom-4 flex justify-center">
          <button
            onClick={handleGenerate}
            className="  hover:bg-gray-200 px-3 py-2 rounded-md ">
            {loading ? "Generating..." : <FolderDown size={"1.2rem"} />}
          </button>
          <button
            className="  hover:bg-gray-200 px-3 py-2 rounded-md"
            onClick={() => navigate(-1)}
          >
            <Home size={"1.2rem"} />
          </button>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="absolute top-1/2
           p-1 right-0 bg-white rounded-full">
          {expanded ? <ChevronLast size={"1.2rem"} /> : <ChevronFirst size={"1.2rem"} />}
        </button>
      </div>

      {/* Right Side */}
      <div className={`
          border-2  ${expanded ? "w-1/5 " : "hidden"}
        `}>
        <Templates cvId={cvId} />
      </div>
    </div>
  );
};

export default CreateCv;


