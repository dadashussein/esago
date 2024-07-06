import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MapInteractionCSS } from "react-map-interaction";
import { Tailwind } from "@fileforge/react-print";
import { ChevronFirst, ChevronLast, Home, Download } from "lucide-react";
import useCompileHtml from "@/hooks/useCompileHtml";
import { store } from "@/store/store";
import A4Component from "../A4";
import Personal from "@/features/Personal";
import Education from "@/features/Education";
import Experience from "@/features/Experience";
import Skill from "@/features/Skill";
import Templates from "./Templates";
import { fetchAllCv } from "@/store/features/resume/resumeSlice";
import Languages from "@/features/Languages";
import ReactiveButton from "../common/ReactiveButton";
import PageLoader from "@/ania/PageLoader";
import {
  increaseTextSize,
  decreaseTextSize,
} from "@/store/features/personal/personalSlice";
import { AArrowUp } from "lucide-react";
import { AArrowDown } from "lucide-react";

const CreateCv = () => {
  const activeTemplate = useSelector((state) => state.templates.activeTemplate);
  const [expanded, setExpanded] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cvId } = useParams();
  const { compileToHtml, status } = useCompileHtml({ cvId });
  const handleMainMenu = () => {
    navigate("/app");
  };

  useEffect(() => {
    dispatch(fetchAllCv({ cvId }));
  }, [dispatch, cvId]);

  const handleGenerate = () => {
    compileToHtml(
      <Provider store={store}>
        <Tailwind>
          <A4Component activeTemplate={activeTemplate} cvId={cvId} />
        </Tailwind>
      </Provider>,
    );
  };

  return (
    <div className="flex h-screen bg-white/85 flex-col md:flex-row">
      {/* Sol Taraf */}
      <div
        className={`relative sm:w-full dark:bg-[#232429] sideBarShowAnime ${
          expanded ? "lg:w-2/5" : "lg:w-1/2"
        }`}
      >
        <div
          id="scrollbar1"
          className="p-4 flex flex-col border border-bg-gray-400 gap-6 h-full overflow-y-scroll scroll-smooth"
        >
          <Personal cvId={cvId} activeTemplate={activeTemplate} />
          <hr />
          <Education cvId={cvId} />
          <hr />
          <Experience cvId={cvId} />
          <hr />
          <Skill cvId={cvId} />
          <hr />
          <Languages cvId={cvId} />
          <hr />
        </div>
      </div>
      {/* Orta */}
      <div
        className={`relative transition duration-150 bg-green-100 hidden md:block ${
          expanded ? "w-2/5" : "w-1/2"
        }`}
      >
        <MapInteractionCSS
          showControls
          defaultValue={{ scale: 0.6, translation: { x: 30, y: 20 } }}
          minScale={0.5}
          maxScale={3}
          translationBounds={{ xMax: 700, yMax: 700 }}
        >
          <PageLoader status={status}>
              <A4Component activeTemplate={activeTemplate} cvId={cvId} />
          </PageLoader>
        </MapInteractionCSS>
        <div
          className="bg-white  rounded-md px-4 
         absolute left-[40%] items-center backdrop-blur-2xl top-4 flex justify-center gap-4"
        >
          <button onClick={() => dispatch(decreaseTextSize())}>
            <AArrowDown size={"1rem"} />
          </button>

          <button onClick={() => dispatch(increaseTextSize())}>
            <AArrowUp size={"1rem"} />
          </button>
        </div>
        <div
          className="border text-white rounded-md bg-primary-500 px-4 
         absolute left-[40%] items-center bottom-4 flex justify-center"
        >
          <ReactiveButton
            className={"px-3 py-2 rounded-md"}
            onClick={handleGenerate}
            icon={<Download size={"1.5rem"} />}
            status={status}
          />

          <button className="px-3 py-2 rounded-md" onClick={handleMainMenu}>
            <Home size={"1.5rem"} />
          </button>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="absolute top-1/2 p-1 right-0 bg-white rounded-full"
        >
          {expanded ? (
            <ChevronLast size={"1.2rem"} />
          ) : (
            <ChevronFirst size={"1.2rem"} />
          )}
        </button>
      </div>

      {/* Sağ Taraf */}
      <div
        className={`border sideBarShowAnime bg-white/70 ${expanded ? "w-1/5 " : "hidden"}`}
      >
        <Templates cvId={cvId} />
      </div>
    </div>
  );
};

export default CreateCv;
