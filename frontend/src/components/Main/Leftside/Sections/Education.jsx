import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { GoArrowLeft } from "react-icons/go";
import useEducation from "~/hooks/useEducation";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { postEducation } from "~/store/features/education/educationThunks";

const Education = ({ setCurrentSection }) => {
  const {
    education,
    currentIndex,
    formRef,
    handleAddEducation,
    handleRemoveEducation,
    handleInputChange,
    setCurrentIndex,
    handleUpdateEducation,
  } = useEducation(setCurrentSection);

  const dispatch = useDispatch();

  const handleSendAndNext = (e) => {
    const token = localStorage.getItem("accessToken");
    e.preventDefault();
    dispatch(postEducation({ token, education }));
    setCurrentSection(1);
  };

  return (
    <div className="border-gray-900 px-6 py-4">
      <button
        onClick={() => setCurrentSection(0)}
        className="cursor-pointer inline-block"
      >
        <GoArrowLeft size="1.5rem" />
      </button>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[30px] text-gray-900">Education</h2>
        {education.length > 0 && (
          <div className="col-span-full flex">
            <button
              type="button"
              onClick={handleRemoveEducation}
              className="flex items-center text-gray-600 hover:text-red-500 duration-200 ease-linear "
            >
              <MdDelete size="2rem" />
            </button>
            <button
              type="button"
              onClick={handleUpdateEducation}
              className="flex items-center text-gray-600 hover:text-red-500 duration-200 ease-linear "
            >
              {/* {isEditing ? <MdSave size="2rem" /> : <MdEdit size="2rem" />} */}
              save
            </button>
          </div>
        )}
      </div>
      <p className="text-sm leading-6 text-gray-600">
        Add your most relevant education, including programs youre currently
        enrolled in
      </p>

      {education.length === 0 && (
        <button
          onClick={handleAddEducation}
          className="border-2 rounded-md duration-200 hover:bg-slate-300 py-2 px-4 mt-4"
        >
          Add Education
        </button>
      )}

      {education.length > 0 && (
        <form
          ref={formRef}
          className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-6"
        >
          <div className="sm:col-span-3">
            <label
              htmlFor={`school_name-${currentIndex}`}
              className="label-primary"
            >
              School Name
            </label>
            <input
              type="text"
              required
              value={education[currentIndex]?.school_name || ""}
              onChange={(e) => handleInputChange("school_name", e.target.value)}
              name={`school_name-${currentIndex}`}
              id={`school_name-${currentIndex}`}
              placeholder="School Name"
              className="input-primary"
            />
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor={`location-${currentIndex}`}
              className="label-primary"
            >
              School Location
            </label>
            <input
              type="text"
              required
              value={education[currentIndex]?.location || ""}
              placeholder="School Location"
              onChange={(e) => handleInputChange("location", e.target.value)}
              name={`location-${currentIndex}`}
              id={`location-${currentIndex}`}
              className="input-primary"
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="degree" className="label-primary">
              Degree
            </label>
            <input
              type="text"
              value={education[currentIndex]?.degree || ""}
              onChange={(e) => handleInputChange("degree", e.target.value)}
              name={`degree-${currentIndex}`}
              id={`degree-${currentIndex}`}
              placeholder="Degree"
              className="input-primary "
            />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="field" className="label-primary">
              Field
            </label>
            <input
              type="text"
              value={education[currentIndex]?.field_of_study || ""}
              onChange={(e) =>
                handleInputChange("field_of_study", e.target.value)
              }
              name={`field_of_study-${currentIndex}`}
              id={`field_of_study-${currentIndex}`}
              placeholder="Field"
              className="input-primary"
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="start_date" className="label-primary">
              Start Date
            </label>
            <input
              type="year"
              value={education[currentIndex]?.start_date || ""}
              onChange={(e) => handleInputChange("start_date", e.target.value)}
              name={`start_date-${currentIndex}`}
              id={`start_date-${currentIndex}`}
              placeholder="Start Date"
              className="input-primary"
            />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="end_date" className="label-primary">
              End Date
            </label>
            <input
              type="year"
              value={education[currentIndex]?.end_date || ""}
              onChange={(e) => handleInputChange("end_date", e.target.value)}
              name={`end_date-${currentIndex}`}
              id={`end_date-${currentIndex}`}
              placeholder="End Date"
              className="input-primary"
            />
          </div>

          <div className="col-span-full">
            <label
              htmlFor={`description-${currentIndex}`}
              className="label-primary"
            >
              Description
            </label>
            <textarea
              id={`description-${currentIndex}`}
              name={`description-${currentIndex}`}
              value={education[currentIndex]?.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              placeholder="A brief description of your education"
              className="input-primary"
            />
            <div className="flex relative items-center gap-[12rem]">
              <button
                type="button"
                onClick={handleAddEducation}
                className="border-2 rounded-md duration-200 hover:bg-slate-300 py-2 px-4 mt-4"
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
              {currentIndex === education.length - 1 && (
                <button
                  onClick={handleSendAndNext}
                  className="border-2 rounded-md duration-200 hover:bg-slate-300 py-2 px-4 mt-4"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Education;
