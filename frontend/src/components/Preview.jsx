import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Template3 from "./templates/Template3";

const Preview = () => {
  const education = useSelector((state) => state.education.education);
  const experience = useSelector((state) => state.experience.experience);
  const personal = useSelector((state) => state.personal.personal);
  const skills = useSelector((state) => state.skills.skills);
  const [finalExperience, setFinalExperience] = useState([]);


  useEffect(() => {
    localStorage.setItem("experience", JSON.stringify(experience));
  }, [experience]);

  useEffect(() => {
    const experienceFromStorage = JSON.parse(
      localStorage.getItem("experience")
    );

    if (experience.length <= 1) {
      setFinalExperience(experience);
    } else {
      setFinalExperience(experienceFromStorage);
    }
  }, [experience]);

  let imgURl = `http://localhost:8000/static/cv_pictures/${personal?.picture}`;


  return (
    <>
      <Template3
        img={imgURl}
        personal={personal}
        education={education}
        experience={finalExperience}
        skills={skills}
      />
    </>
  );
};

export default Preview;
