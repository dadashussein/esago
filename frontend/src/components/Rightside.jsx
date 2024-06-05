import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Template3 from "./templates/Template3";

const Rightside = () => {
  const education = useSelector((state) => state.education.education);
  const experience = useSelector((state) => state.experience.experience);
  const personal = useSelector((state) => state.personal.personal);
  const [finalExperience, setFinalExperience] = useState([]);

  //console.log(education);

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

  const auth = useSelector((state) => state.auth.currentUser);

  let imgURl = `http://localhost:8000/static/profiles/${auth?.profile_picture}`;
  

  return (
    <div className="bg-gray-100  w-[30rem]">
      <Template3
        img={imgURl}
        personal={personal}
        education={education}
        experience={finalExperience}
      />
    </div>
  );
};

export default Rightside;
