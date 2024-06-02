import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import {
  addExperience,
  removeExperience,
  setExperienceField,
} from "~/store/features/experience/experienceSlice";

const Experience = ({ setCurrentSection }) => {
  const dispatch = useDispatch();
  const experience = useSelector((state) => state.experience.experience);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleInputChange = (field, value) => {
    dispatch(setExperienceField({ index: currentIndex, field, value }));
  };
  const handleAddExperience = () => {
    dispatch(addExperience());
    setCurrentIndex(experience.length);
  };
  const handleRemoveExperience = () => {
    dispatch(removeExperience(currentIndex));
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <div className="border-gray-900 p-6">
      <div className="flex items-center justify-between">
        <button onClick={() => setCurrentSection(1)}>geri</button>
        <h2 className="font-semibold text-[30px] text-gray-900">Experience</h2>
        {experience.length > 1 && (
          <div className="col-span-full">
            <button
              type="button"
              onClick={handleRemoveExperience}
              className="flex items-center text-gray-600 hover:text-red-500 duration-200 ease-linear "
            >
              <MdDelete size="2rem" />
            </button>
          </div>
        )}
      </div>
      <p className="text-sm leading-6 text-gray-600">
        Add your most relevant work, company programs youre currently work in
      </p>

      {experience.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor={`company-${currentIndex}`}
              className="label-primary"
            >
              Company name
            </label>
            <div className="mt-2">
              <input
                type="text"
                required
                value={experience[currentIndex].company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                name={`company-${currentIndex}`}
                id={`company-${currentIndex}`}
                placeholder="name"
                className="input-primary"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor={`companyPlace-${currentIndex}`}
              className="label-primary"
            >
              Company location
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={experience[currentIndex].companyPlace}
                placeholder="School Location"
                onChange={(e) =>
                  handleInputChange("companyPlace", e.target.value)
                }
                name={`companyPlace-${currentIndex}`}
                id={`companyPlace-${currentIndex}`}
                className="input-primary"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="field" className="label-primary">
              Field
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={experience[currentIndex].field}
                onChange={(e) => handleInputChange("field", e.target.value)}
                name={`field-${currentIndex}`}
                id={`field-${currentIndex}`}
                placeholder="Field"
                className="input-primary"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="workStart" className="label-primary">
              Start Date
            </label>
            <div className="mt-2">
              <input
                type="month"
                required
                value={experience[currentIndex].workStart}
                onChange={(e) => handleInputChange("workStart", e.target.value)}
                name={`workStart-${currentIndex}`}
                id={`workStart-${currentIndex}`}
                placeholder="Start Date"
                className="input-primary"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="workEnd" className="label-primary">
              End Date
            </label>
            <div className="mt-2">
              <input
                type="date"
                required
                value={experience[currentIndex].workEnd}
                onChange={(e) => handleInputChange("workEnd", e.target.value)}
                name={`workEnd-${currentIndex}`}
                id={`workEnd-${currentIndex}`}
                placeholder="End Date"
                className="input-primary"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor={`workDesc-${currentIndex}`}
              className="label-primary"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id={`workDesc-${currentIndex}`}
                name={`workDesc-${currentIndex}`}
                value={experience[currentIndex].workDesc}
                onChange={(e) => handleInputChange("workDesc", e.target.value)}
                rows={3}
                placeholder="A brief description of your experience"
                className="input-primary"
              />
            </div>
            <div className="flex items-center gap-[12rem]">
              <button
                type="button"
                onClick={handleAddExperience}
                className=" border-2 rounded-md duration-200 hover:bg-slate-300 py-2 px-4 mt-4"
              >
                <IoMdAdd />
              </button>
              {experience.length > 1 && (
                <div className="flex justify-center gap-8 mt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentIndex((prev) => Math.max(prev - 1, 0))
                    }
                    className="border hover:bg-gray-200"
                  >
                    <GrFormPrevious size="1.5rem" />
                  </button>
                  <span className="text-gray-600">
                    {currentIndex + 1} of {experience.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentIndex((prev) =>
                        Math.min(prev + 1, experience.length - 1)
                      )
                    }
                    className="border hover:bg-gray-200"
                  >
                    <GrFormNext size="1.5rem" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;
