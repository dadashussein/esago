import { useDispatch, useSelector } from "react-redux";
import {
  addEducation,
  setEducationField,
  removeEducation,
} from "../../../../store/features/education/educationSlice";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const Education = () => {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.education.education);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleInputChange = (field, value) => {
    dispatch(setEducationField({ index: currentIndex, field, value }));
  };

  const handleAddEducation = () => {
    dispatch(addEducation());
    setCurrentIndex(education.length);
  };

  const handleRemoveEducation = () => {
    dispatch(removeEducation(currentIndex));
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="border-gray-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[30px] text-gray-900">Education</h2>
        {education.length > 1 && (
          <div className="col-span-full">
            <button
              type="button"
              onClick={handleRemoveEducation}
              className="flex items-center text-gray-600 hover:text-red-500 duration-200 ease-linear "
            >
              <MdDelete size="2rem" />
            </button>
          </div>
        )}
      </div>
      <p className="text-sm leading-6 text-gray-600">
        Add your most relevant education, including programs youre currently
        enrolled in
      </p>

      {education.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor={`school-${currentIndex}`} className="label-primary">
              School Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={education[currentIndex].school}
                onChange={(e) => handleInputChange("school", e.target.value)}
                name={`school-${currentIndex}`}
                id={`school-${currentIndex}`}
                placeholder="School Name"
                className="input-primary"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor={`eduLocation-${currentIndex}`}
              className="label-primary"
            >
              School Location
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={education[currentIndex].eduLocation}
                placeholder="School Location"
                onChange={(e) =>
                  handleInputChange("eduLocation", e.target.value)
                }
                name={`eduLocation-${currentIndex}`}
                id={`eduLocation-${currentIndex}`}
                className="input-primary"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="degree" className="label-primary">
              Degree
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={education[currentIndex].degree}
                onChange={(e) => handleInputChange("degree", e.target.value)}
                name={`degree-${currentIndex}`}
                id={`degree-${currentIndex}`}
                placeholder="Degree"
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
                value={education[currentIndex].field}
                onChange={(e) => handleInputChange("field", e.target.value)}
                name={`field-${currentIndex}`}
                id={`field-${currentIndex}`}
                placeholder="Field"
                className="input-primary"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="startDate" className="label-primary">
              Start Date
            </label>
            <div className="mt-2">
              <input
                type="year"
                value={education[currentIndex].eduStart}
                onChange={(e) => handleInputChange("eduStart", e.target.value)}
                name={`startDate-${currentIndex}`}
                id={`startDate-${currentIndex}`}
                placeholder="Start Date"
                className="input-primary"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="startDate" className="label-primary">
              End Date
            </label>
            <div className="mt-2">
              <input
                type="year"
                value={education[currentIndex].eduEnd}
                onChange={(e) => handleInputChange("eduEnd", e.target.value)}
                name={`eduEnd-${currentIndex}`}
                id={`eduEnd-${currentIndex}`}
                placeholder="End Date"
                className="input-primary"
              />
            </div>
          </div>


          <div className="col-span-full">
            <label
              htmlFor={`eduDesc-${currentIndex}`}
              className="label-primary"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id={`eduDesc-${currentIndex}`}
                name={`eduDesc-${currentIndex}`}
                value={education[currentIndex].eduDesc}
                onChange={(e) => handleInputChange("eduDesc", e.target.value)}
                rows={3}
                placeholder="A brief description of your education"
                className="input-primary"
              />
            </div>
            <div className="flex items-center gap-[12rem]">
              <button
                type="button"
                onClick={handleAddEducation}
                className=" border-2 rounded-md duration-200 hover:bg-slate-300 py-2 px-4 mt-4"
              >
                <IoMdAdd />
              </button>
              {education.length > 1 && (
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
                    {currentIndex + 1} of {education.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentIndex((prev) =>
                        Math.min(prev + 1, education.length - 1)
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

export default Education;
