import { useEffect } from "react";
import temp1 from "../assets/temp1.png";
import temp2 from "../assets/temp2.png";
import avery from "../assets/aver.png";
import { useDispatch, useSelector } from "react-redux";

import {
  postTemplate,
  setTemplate,
} from "~/store/features/templates/templateSlice";
import { Paintbrush } from "lucide-react";

const templates = [
  {
    id: 1,
    name: "Template 1",
    image: temp1,
  },
  {
    id: 2,
    name: "Template 2",
    image: temp2,
  },
  {
    id: 3,
    name: "Template 3",
    image: temp1,
  },
  {
    id: 4,
    name: "Avery Template",
    image: avery,
  }
];

const Templates = ({ cvId }) => {
  const dispatch = useDispatch();
  const activeTemplate = useSelector((state) => state.templates.activeTemplate);
  const personal = useSelector((state) => state.personal.personal);
  const { template_id } = personal;


  const handleTemplate = async (id) => {
    try {
      dispatch(postTemplate({ cvId, activeTemplate: id }));
      dispatch(setTemplate(id));
    } catch (error) {
      console.error("Failed to save template: ", error);
    }
  };

  useEffect(() => {
    dispatch(setTemplate(template_id));
  }, [template_id, dispatch]);

  return (
    <div className="p-2 ">
      <h1 className="section-title ">
        <span>{<Paintbrush />}</span>
        Templates
      </h1>

      <div className="grid grid-cols-2 gap-4 mt-4	">
        {templates && templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleTemplate(template.id)}
           
          >
            <img  className={`cursor-pointer border-2
              rounded ${activeTemplate === template.id ? "border-blue-500" : ""}`}src={template.image} alt={template.name} />
            <p className="text-center text-xs">{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
