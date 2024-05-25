import { useContext, useState } from "react";
import "./leftside.css";
import Personal from "./Sections/Personal";
import { CvInputContext } from "../../../context/CvInputContext";
import Education from "./Sections/Education";
import Experience from "./Sections/Experience";

const Leftside = () => {
    const {
        changeName,
        changeLastname,
        changeJobtitle,
        changePhone,
        changeEmail,
        changeAdress,
        changeBio
    } = useContext(CvInputContext);

    const [currentSection, setCurrentSection] = useState(0);

    const sections = [
        <Personal
            changeName={changeName}
            changeLastname={changeLastname}
            changeJobtitle={changeJobtitle}
            changePhone={changePhone}
            changeEmail={changeEmail}
            changeAdress={changeAdress}
            changeBio={changeBio}
        />,
        <Education />,
        <Experience />
    ];

    const handleNext = () => {
        setCurrentSection((prevSection) => (prevSection + 1) % sections.length);
    };

    const handlePrevious = () => {
        setCurrentSection((prevSection) => (prevSection - 1 + sections.length) % sections.length);
    };

    return (
        <div className="leftside">
            {sections[currentSection]}
            <div className="navigation-buttons">
                {currentSection > 0 && (
                    <button className="border p-2 bg-blue-500 rounded-lg text-white"
                        onClick={handlePrevious}>Previous Section</button>
                )}
                <button className="border p-2 bg-blue-500 rounded-lg text-white"
                    onClick={handleNext}>
                    {currentSection === sections.length - 1 ? "Restart" : "Next Section"}
                </button>
            </div>
        </div>
    );
};

export default Leftside;
