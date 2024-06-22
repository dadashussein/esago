import useEducation from "@/hooks/useEducation";
import { GraduationCap, Trash } from "lucide-react";
import EducationForm from "./EducationForm";
import EducationNavigation from "./EducationNavigation";

const Education = ({ cvId }) => {
  const {
    education,
    currentIndex,
    handleAddEducation,
    handleInputChange,
    handleRemoveEducation,
    setCurrentIndex,
  } = useEducation({ cvId });

  return (
    <div className="border-gray-900/10  relative">
      <div className="flex items-center justify-between">
        <h2 className="section-title ">
          <span>
            <GraduationCap size={"1.7rem"} />
          </span>
          Education
        </h2>
        <div className="col-span-full flex">
          <button
            type="button"
            onClick={handleRemoveEducation}
            className="flex items-center text-gray-600 hover:text-red-500 duration-200 ease-linear"
          >
            <Trash />
          </button>
        </div>
      </div>
      <p className="section-description">
        Add your most relevant education, including programs youre currently
        enrolled in
      </p>
      {education.length > 0 && (
        <>
          <EducationForm
            currentIndex={currentIndex}
            education={education}
            handleInputChange={handleInputChange}
            handleAddEducation={handleAddEducation}
          />
          <EducationNavigation
            currentIndex={currentIndex}
            education={education}
            setCurrentIndex={setCurrentIndex}
          />
        </>
      )}
    </div>
  );
};

export default Education;
