import React from "react";
import { useSelector } from "react-redux";
import Template3 from "./templates/Template3";
import { baseUrl } from "~/utils/api";
import Template5 from "./templates/Template5";
import Template6 from "./templates/template6/Template6";
import Template2 from "./templates/Template2";
import Template7 from "./templates/Template7";

const Preview = ({ activeTemplate, setActiveTemplate }) => {
  const education = useSelector((state) => state.education.education);
  const experience = useSelector((state) => state.experience.experience);
  const personal = useSelector((state) => state.personal.personal);
  const skills = useSelector((state) => state.skills.skills);
  let imgURl = `${baseUrl}/static/cv_pictures/${personal?.picture}`;

  return (
    <div>
      {activeTemplate === 2 && (
        <Template2
          img={imgURl}
          personal={personal}
          education={education}
          experience={experience}
          skills={skills}
        />
      )}
      {activeTemplate === 3 && (
        <Template3
          img={imgURl}
          personal={personal}
          education={education}
          experience={experience}
          skills={skills}
        />
      )}
      {activeTemplate === 5 && (
        <Template5
          img={imgURl}
          personal={personal}
          education={education}
          experience={experience}
          skills={skills}
        />
      )}
      {activeTemplate === 6 && (
        <Template6
          img={imgURl}
          personal={personal}
          education={education}
          experience={experience}
          skills={skills}
        />
      )}
      {activeTemplate === 7 && (
        <Template7
          img={imgURl}
          personal={personal}
          education={education}
          experience={experience}
          skills={skills}
        />
      )}
    </div>
  );
};

export default Preview;
