import { baseUrl } from "@/utils/api";
import { useSelector } from "react-redux";
import Template1 from "./templates/Template1";
import AveryTemp from "./templates/AveryTemp";
import DarkBlue from "./templates/DarkBlue";

import { FourSquare } from "react-loading-indicators";

const Preview = () => {
  const education = useSelector((state) => state.education.education);
  const experience = useSelector((state) => state.experience.experience);
  const personal = useSelector((state) => state.personal.personal);
  const status = useSelector((state) => state.templates.status);
  const { text_size } = useSelector((state) => state.personal);

  const languages = useSelector((state) => state.languages.languages);
  const { template_id } = personal;
  const skills = useSelector((state) => state.skills.skills);
  let imgURl = `${baseUrl}/static/cv_pictures/${personal?.picture}`;

  return (
    <>
      {status === "loading" ? (
        <div className="absolute left-1/2 top-1/2">
          <FourSquare
            color="#32cd32"
            size="large"
            text=""
            textColor="Hopus focus"
          />
        </div>
      ) : (
        <div className="overflow-hidden">
          {template_id === 1 && (
            <Template1
              img={imgURl}
              personal={personal}
              education={education}
              experience={experience}
              skills={skills}
              languages={languages}
              text_size={text_size}
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
              text_size={text_size}
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
              text_size={text_size}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Preview;
