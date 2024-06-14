import { MdDelete } from "react-icons/md";
import EducationForm from "./EducationForm";
import EducationNavigation from "./EducationNavigation";
import useEducation from "~/hooks/useEducation";

const Education = ({ setActiveTab, cvId }) => {
  const {
    education,
    currentIndex,
    handleAddEducation,
    handleInputChange,
    handleRemoveEducation,
    setCurrentIndex,
  } = useEducation({ setActiveTab, cvId });

  return (
    <div className="border-gray-900/10  relative">
      <div className="flex items-center justify-between">
        <h2 className="section-title ">Education</h2>
        <div className="col-span-full flex">
          <button
            type="button"
            onClick={handleRemoveEducation}
            className="flex items-center text-gray-600 hover:text-red-500 duration-200 ease-linear"
          >
            <MdDelete size="2rem" />
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
      {/* <button
                type="button"
                onClick={() => setActiveTab(2)}
                className="inline-flex py-2 px-6 absolute text-center bottom-[-50px] right-[-10px] rounded-[20px] bg-primary-500 text-white"
            >
                Next
            </button> */}
    </div>
  );
};

export default Education;
