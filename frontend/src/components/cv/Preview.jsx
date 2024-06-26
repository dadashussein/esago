import { baseUrl } from "@/utils/api";
import { useSelector } from "react-redux";
import Template1 from "./templates/Template1";
import AveryTemp from "./templates/AveryTemp";
import DarkBlue from "./templates/DarkBlue";

const Preview = () => {
  const education = useSelector((state) => state.education.education);
  const experience = useSelector((state) => state.experience.experience);
  const personal = useSelector((state) => state.personal.personal);
  const languages = useSelector((state) => state.languages.languages);
  const { template_id } = personal;
  const skills = useSelector((state) => state.skills.skills);
  let imgURl = `${baseUrl}/static/cv_pictures/${personal?.picture}`;

  console.log(imgURl);

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
            languages={languages}
          />
        )}

        {template_id === 2 && (
          <AveryTemp
            img={imgURl}
            personal={personal}
            education={education}
            experience={experience}
            skills={skills}
            languages={languages}
          />
        )}
        {template_id === 3 && (
          <DarkBlue
            img={imgURl}
            personal={personal}
            education={education}
            experience={experience}
            skills={skills}
            languages={languages}
          />
        )}
      </div>
    </>
  );
};

export default Preview;
