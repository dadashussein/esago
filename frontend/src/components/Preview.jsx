import { useSelector } from "react-redux";
import Template3 from "./templates/Template3";
import { baseUrl } from "~/utils/api";
import Template5 from "./templates/Template5";
import { Tailwind, compile } from "@fileforge/react-print";
import Resume from "./templates/TestRes";

import useCompileHtml from "~/hooks/useCompileHtml";

const Preview = ({ activeTemplate, cvId }) => {
  const education = useSelector((state) => state.education.education);
  const experience = useSelector((state) => state.experience.experience);
  const personal = useSelector((state) => state.personal.personal);
  const { template_id } = personal;

  const skills = useSelector((state) => state.skills.skills);
  let imgURl = `${baseUrl}/static/cv_pictures/${personal?.picture}`;
  const { compileToHtml, loading, error } = useCompileHtml({ cvId });

  const handleGenerate = () => {
    compileToHtml(
      <Tailwind>
        {activeTemplate === 1 && (
          <Template3
            img={imgURl}
            personal={personal}
            education={education}
            experience={experience}
            skills={skills}
          />
        )}
        {activeTemplate === 2 && (
          <Template5
            img={imgURl}
            personal={personal}
            education={education}
            experience={experience}
            skills={skills}
          />
        )}
        {activeTemplate === 3 &&
          <Resume img={imgURl}
            personal={personal}
            education={education}
            experience={experience}
            skills={skills} />}
      </Tailwind>
    );
  };

  return (
    <div>
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

      {/* <button onClick={handleGenerate}>
        {loading ? "Generating..." : "Generate"}
      </button> */}

    </div>
  );
};

export default Preview;
