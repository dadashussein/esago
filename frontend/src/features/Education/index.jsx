import { GraduationCap, Trash, PlusCircle } from "lucide-react";
import EducationForm from "./EducationForm";
import EducationNavigation from "./EducationNavigation";
import useEducation from "@/hooks/useEducation";

const Education = ({ cvId }) => {
  const {
    education,
    status,
    currentIndex,
    handleAddEducation,
    handleInputChange,
    handleRemoveEducation,
    addNewItem,
    setCurrentIndex,
  } = useEducation({ cvId });

  return (
    <div className="border-gray-900/10 relative">
      <div className="flex items-center justify-between">
        <h2 className="section-title">
          <span>
            <GraduationCap size={"1.7rem"} />
          </span>
          Education
        </h2>
        {education.length > 0 && (
          <div className="col-span-full flex">
            <button
              type="button"
              onClick={handleRemoveEducation}
              className="flex items-center text-gray-600 hover:text-red-500 duration-200 ease-linear"
            >
              <Trash />
            </button>
          </div>
        )}
      </div>
      <p className="section-description">
        Add your most relevant education, including programs you&apos;re
        currently enrolled in
      </p>
      {education.length > 0 ? (
        <>
          <EducationForm
            currentIndex={currentIndex}
            status={status}
            education={education}
            handleInputChange={handleInputChange}
            handleAddEducation={handleAddEducation}
          />
          <EducationNavigation
            currentIndex={currentIndex}
            education={education}
            setCurrentIndex={setCurrentIndex}
          />
          <div className="flex justify-center items-center mt-4">
            <button
              type="button"
              onClick={addNewItem}
              className="flex items-center text-gray-600 hover:text-blue-500 duration-200 ease-linear"
            >
              <PlusCircle size={"1.7rem"} />
              <span className="ml-2">Add new item</span>
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center mt-4">
          <button
            type="button"
            onClick={addNewItem}
            className="flex items-center text-gray-600 hover:text-blue-500 duration-200 ease-linear"
          >
            <PlusCircle size={"1.7rem"} />
            <span className="ml-2">Add Education</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Education;
