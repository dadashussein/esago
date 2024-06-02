import { useEffect, useState } from "react";
import Personal from "./Sections/Personal";
import Education from "./Sections/Education";
import Experience from "./Sections/Experience";
import Skill from "./Sections/Skill";

const Leftside = () => {
  const savedSection = parseInt(localStorage.getItem("currentSection"), 10);
  const [currentSection, setCurrentSection] = useState(savedSection || 0);
  useEffect(() => {
    localStorage.setItem("currentSection", currentSection);
  }, [currentSection]);

  const sections = [
    <Personal setCurrentSection={setCurrentSection} key="first" />,
    <Education setCurrentSection={setCurrentSection} key="second" />,
    <Experience key="third" setCurrentSection={setCurrentSection} />,
    <Skill key="fourth" />,
  ];

  return <div className="border">{sections[currentSection]}</div>;
};

export default Leftside;
