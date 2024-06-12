import { useSelector } from "react-redux";
import Template3 from "./templates/Template3";
import { baseUrl } from "~/utils/api";

const Preview = () => {
  const education = useSelector((state) => state.education.education);
  const experience = useSelector((state) => state.experience.experience);
  const personal = useSelector((state) => state.personal.personal);
  const skills = useSelector((state) => state.skills.skills);
  let imgURl = `${baseUrl}/static/cv_pictures/${personal?.picture}`;


  return (
    <>
      <Template3
        img={imgURl}
        personal={personal}
        education={education}
        experience={experience}
        skills={skills}
      />
    </>
  );
};

export default Preview;
