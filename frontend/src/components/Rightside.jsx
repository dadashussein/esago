import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Template3 from "./templates/Template3";

const Rightside = () => {
  const education = useSelector((state) => state.education.education);
  const experience = useSelector((state) => state.experience.experience);
  const personal = useSelector((state) => state.personal.personal);
  const [finalEducation, setFinalEducation] = useState([]);
  const [finalExperience, setFinalExperience] = useState([]);

  useEffect(() => {
    localStorage.setItem("education", JSON.stringify(education));
  }, [education]);

  useEffect(() => {
    const educationFromStorage = JSON.parse(localStorage.getItem("education"));

    if (education.length <= 1) {
      setFinalEducation(education);
    } else {
      setFinalEducation(educationFromStorage);
    }
  }, [education]);

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
    <div className="bg-gray-100">
      <div className="h-[842px] w-[595px]">
        <Template3
          img={imgURl}
          personal={personal}
          education={finalEducation}
          experience={finalExperience}
        />
      </div>
    </div>
  );
};

export default Rightside;
