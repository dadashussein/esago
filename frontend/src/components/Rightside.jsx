import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Template2 from "./templates/Template2";

const Rightside = () => {
  const { name, lastname, jobtitle, address, phone, email, bio } = useSelector(
    (state) => state.personal
  );
  const education = useSelector((state) => state.education.education);
  const [finalEducation, setFinalEducation] = useState([]);
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


  return (
    <div className="rightside">
      <Template2
        name={name}
        lastname={lastname}
        jobtitle={jobtitle}
        address={address}
        phone={phone}
        email={email}
        bio={bio}
        education={finalEducation}
      />
    </div>
  );
};

export default Rightside;
