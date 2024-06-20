import { useSelector } from "react-redux";
import Template3 from "./templates/Template3";
import { baseUrl } from "~/utils/api";
import Template5 from "./templates/Template5";
import Resume from "./templates/TestRes";
import AveryTemp from "./CvTemplate/AveryTemp";

const Preview = () => {
  const education = useSelector((state) => state.education.education);
  const experience = useSelector((state) => state.experience.experience);
  const personal = useSelector((state) => state.personal.personal);
  const { template_id } = personal;

  const skills = useSelector((state) => state.skills.skills);
  let imgURl = `${baseUrl}/static/cv_pictures/${personal?.picture}`;

  return (
    <>
      <div className="">
        {template_id === 1 && (
          <Template3
            img={imgURl}
            personal={personal}
            education={education}
            experience={experience}
            skills={skills}
          />
        )}
        {template_id === 2 && (
          <Template5
            img={imgURl}
            personal={personal}
            education={education}
            experience={experience}
            skills={skills}
          />
        )}
        {template_id === 3 && (
          <Resume img={imgURl}
            personal={personal}
            education={education}
            experience={experience}
            skills={skills} />
        )}
        {template_id === 4 && (
          <AveryTemp img={imgURl}
            personal={personal}
            education={education}
            experience={experience}
            skills={skills} />
        )}
      </div>
    </>
  );
};

export default Preview;
