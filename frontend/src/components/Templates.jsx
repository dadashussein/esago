import { useEffect } from "react";
import temp1 from "../assets/temp1.png";
import temp2 from "../assets/temp2.png";
import { useDispatch, useSelector } from "react-redux";

import {
  postTemplate,
  setTemplate,
} from "~/store/features/templates/templateSlice";

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
];

const Templates = ({ cvId }) => {
  const dispatch = useDispatch();
  const activeTemplate = useSelector((state) => state.templates.activeTemplate);
  const personal = useSelector((state) => state.personal.personal);
  const { template_id } = personal;

  const handleTemplate = async (id) => {
    try {
      await dispatch(postTemplate({ cvId, activeTemplate: id }));
      dispatch(setTemplate(id));
    } catch (error) {
      console.error("Failed to save template: ", error);
    }
  };

  useEffect(() => {
    dispatch(setTemplate(template_id));
  }, [template_id, dispatch]);

  return (
    <div className="p-8 h-screen">
      <h1 className="text-2xl">Templates</h1>
      <div className="flex gap-4 flex-wrap">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleTemplate(template.id)}
            className={`cursor-pointer border-2 border-gray-900/10 rounded-lg p-4 ${activeTemplate === template.id ? "border-blue-500" : ""}`}
          >
            <img className="w-20" src={template.image} alt={template.name} />
            <p className="text-center">{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
