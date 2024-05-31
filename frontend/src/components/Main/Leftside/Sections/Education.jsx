import { useDispatch, useSelector } from "react-redux";
import {
  addEducation,
  setEducationField,
  removeEducation,
} from "../../../../store/features/education/educationSlice";
import { useRef, useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { GoArrowLeft } from "react-icons/go";

const Education = ({ setCurrentSection }) => {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.education.education);
  const [currentIndex, setCurrentIndex] = useState(0);
  const formRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const checkIfEmpty = () => {
      const edu = education[0];
      if (
        edu &&
        edu.school === "" &&
        edu.eduLocation === "" &&
        edu.degree === "" &&
        edu.field === "" &&
        edu.eduStart === "" &&
        edu.eduEnd === "" &&
        edu.eduDesc === ""
      ) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
    };
    checkIfEmpty();
  }, [education, currentIndex]);

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

  const handleSendAndNext = (e) => {
    e.preventDefault();
    if (isEmpty) {
      setCurrentSection(2);
    } else {
      // send to backend
      console.log(education);
    }
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
        <form
          ref={formRef}
          className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-6"
        >
          <div className="sm:col-span-3">
            <label htmlFor={`school-${currentIndex}`} className="label-primary">
              School Name
            </label>
            <input
              type="text"
              required
              value={education[currentIndex].school}
              onChange={(e) => handleInputChange("school", e.target.value)}
              name={`school-${currentIndex}`}
              id={`school-${currentIndex}`}
              placeholder="School Name"
              className="input-primary"
            />
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor={`eduLocation-${currentIndex}`}
              className="label-primary"
            >
              School Location
            </label>
            <input
              type="text"
              required
              value={education[currentIndex].eduLocation}
              placeholder="School Location"
              onChange={(e) => handleInputChange("eduLocation", e.target.value)}
              name={`eduLocation-${currentIndex}`}
              id={`eduLocation-${currentIndex}`}
              className="input-primary"
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="degree" className="label-primary">
              Degree
            </label>
            <input
              type="text"
              value={education[currentIndex].degree}
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
              value={education[currentIndex].field}
              onChange={(e) => handleInputChange("field", e.target.value)}
              name={`field-${currentIndex}`}
              id={`field-${currentIndex}`}
              placeholder="Field"
              className="input-primary"
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="startDate" className="label-primary">
              Start Date
            </label>
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
          <div className="sm:col-span-3">
            <label htmlFor="startDate" className="label-primary">
              End Date
            </label>
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

          <div className="col-span-full">
            <label
              htmlFor={`eduDesc-${currentIndex}`}
              className="label-primary"
            >
              Description
            </label>
            <textarea
              id={`eduDesc-${currentIndex}`}
              name={`eduDesc-${currentIndex}`}
              value={education[currentIndex].eduDesc}
              onChange={(e) => handleInputChange("eduDesc", e.target.value)}
              rows={3}
              placeholder="A brief description of your education"
              className="input-primary"
            />
            <div className="flex relative items-center gap-[12rem]">
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
              <button
                type="button"
                onClick={handleSendAndNext}
                className="mt-4 bg-gray-500 absolute right-2 text-white p-1 rounded-md"
              >
                {isEmpty ? "Skip" : "Next"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Education;
