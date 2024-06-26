import { baseUrl } from "@/utils/api";
import { useSelector } from "react-redux";
import Template1 from "./templates/Template1";
import AveryTemp from "./templates/AveryTemp";
import DarkBlue from "./templates/DarkBlue";

const Preview = () => {
  const education = useSelector((state) => state.education.education);
  const experience = useSelector((state) => state.experience.experience);
  const personal = useSelector((state) => state.personal.personal);
  const { template_id } = personal;

  const skills = useSelector((state) => state.skills.skills);
  let imgURl = `${baseUrl}/static/cv_pictures/${personal?.picture}`;

  return (
    <>
      <div className="overflow-hidden">
        {template_id === 1 && (
          <Template1
            img={imgURl}
            personal={personal}
            education={education}
            experience={experience}
            skills={skills}
          />
        )}

        {template_id === 2 && (
          <AveryTemp
            img={imgURl}
            personal={personal}
            education={education}
            experience={experience}
            skills={skills}
          />
        )}
        {template_id === 3 && (
          <DarkBlue
            img={imgURl}
            personal={personal}
            education={education}
            experience={experience}
            skills={skills}
          />
        )}
      </div>
    </>
  );
};

export default Preview;
