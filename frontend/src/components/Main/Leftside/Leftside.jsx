import { useState } from "react";
import Personal from "./Sections/Personal";
import Education from "./Sections/Education";
import Experience from "./Sections/Experience";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

const Leftside = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [<Personal />, <Education />, <Experience />];

  const handleNext = () => {
    setCurrentSection((prevSection) => (prevSection + 1) % sections.length);
  };

  const handlePrevious = () => {
    setCurrentSection(
      (prevSection) => (prevSection - 1 + sections.length) % sections.length
    );
  };

  




  return (
    <div className="border">
      {sections[currentSection]}
      <div className="flex px-10 gap-10">
        {currentSection > 0 && (
          <button className="btn-primary" onClick={handlePrevious}>
            <h1>Previus section</h1>
          </button>
        )}
        <button className="btn-primary" onClick={handleNext}>
          {currentSection === sections.length - 1 ? (
            "Submit"
          ) : (
            <h1>Next section</h1>
          )}
        </button>
      </div>
    </div>
  );
};

export default Leftside;
