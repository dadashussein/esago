import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { GoArrowLeft } from "react-icons/go";
import useEducation from "~/hooks/useEducation";
import { useEffect } from "react";

const Education = ({ setActiveTab }) => {
  const {
    education,
    currentIndex,
    handleAddEducation,
    handleInputChange,
    handleRemoveEducation,
    setCurrentIndex,
  } = useEducation(setActiveTab);

  console.log(currentIndex);

  const gonder = (e) => {
    e.preventDefault();
    handleAddEducation(e);
  };

  console.log(education);

  // useEffect(() => {
  //   console.log(hasId);
  // }, [education]);
  
  // console.log(education);

  // console.log(hasId);

  // const handleNext = (e) => {
  //   e.preventDefault();
  //   if (hasId) {
  //     setActiveTab(2);
  //   } else {
  //     handleAddEducation(e);
  //     setActiveTab(2);
  //   }
  // };

  return (
    <div className="border-gray-900/10 p-6 relative">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold lg:text-[40px] text-[40px] text-gray-900">
          Education
        </h2>
        <div className="col-span-full flex">
            <button
              type="button"
              onClick={handleRemoveEducation}
              className="flex items-center text-gray-600 hover:text-red-500 duration-200 ease-linear "
            >
              <MdDelete size="2rem" />
            </button>
          </div>
      </div>
      <p className="text-sm leading-6 text-gray-600">
        Add your most relevant education, including programs youre currently
        enrolled in
      </p>
      {education.length > 0 && (
        <form
          onSubmit={gonder}
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
              required
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
              required
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
              required
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
              required
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
            <div className="flex gap-4 items-center">
              <textarea
                id={`description-${currentIndex}`}
                name={`description-${currentIndex}`}
                required
                value={education[currentIndex]?.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
                placeholder="A brief description of your education"
                className="input-primary"
              />
              <button
                type="submit"
                className="p-2 bg-primary-500 text-white hover:bg-primary-600 duration-200 ease-linear rounded-md"
              >
                <IoMdAdd />
              </button>
            </div>
            <div className="flex relative items-center gap-[12rem]">
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
        </form>
      )}
      <button
        type="button"
        onClick={() => setActiveTab(2)}
        className="inline-flex py-2 px-6 absolute text-center bottom-[-50px] right-[-10px]    rounded-[20px] bg-primary-500 text-white"
      >
        Next
      </button>
    </div>
  );
};

export default Education;
