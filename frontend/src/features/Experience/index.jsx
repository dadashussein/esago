import useExperience from "@/hooks/useExperience";
import { BriefcaseBusiness, Trash } from "lucide-react";
import ExperienceForm from "./ExperienceForm";
import ExperienceNav from "./ExperienceNav";
import { PlusCircle } from "lucide-react";

const Experience = ({ cvId }) => {
  const {
    experience,
    currentIndex,
    statusExperience,
    addNewItem,
    handleRemoveExperience,
    handleInputChange,
    handleAddExperience,
    setCurrentIndex,
  } = useExperience({ cvId });

  return (
    <div className="border-gray-900/10 relative">
      <div className="flex items-center justify-between">
        <h2 className="section-title">
          <span>
            <BriefcaseBusiness size={"1.7rem"} />
          </span>
          Experience
        </h2>
        {experience.length > 0 && (
          <div className="col-span-full flex">
            <button
              type="button"
              onClick={handleRemoveExperience}
              className="flex items-center text-gray-600 hover:text-red-500 duration-200 ease-linear"
            >
              <Trash />
            </button>
          </div>
        )}
      </div>
      <p className=" section-description">
        Add your most relevant work, company programs youre currently work in{" "}
      </p>
      {experience.length > 0 ? (
        <>
          <ExperienceForm
            currentIndex={currentIndex}
            experience={experience}
            status={statusExperience}
            handleInputChange={handleInputChange}
            handleAddExperience={handleAddExperience}
          />
          <ExperienceNav
            currentIndex={currentIndex}
            experience={experience}
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
            <span className="ml-2">Add Experience</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Experience;
