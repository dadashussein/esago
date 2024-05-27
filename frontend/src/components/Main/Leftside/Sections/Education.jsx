import { useDispatch, useSelector } from "react-redux";
import {
  addEducation,
  setEducationField,
  removeEducation,
} from "../../../../store/features/education/educationSlice";
import { MdDelete } from "react-icons/md";

const Education = () => {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.education.education);

  const handleInputChange = (index, field, value) => {
    dispatch(setEducationField({ index, field, value }));
  };

  return (
    <div className="border-gray-900/10 p-6">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Education
      </h2>
      <p className="text-sm leading-6 text-gray-600">
        Add your most relevant education, including programs youre currently
        enrolled in
      </p>

      {education.map((edu, index) => (
        <div
          key={index}
          className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
        >
          <div className="sm:col-span-3">
            <label htmlFor={`school-${index}`} className="label-primary">
              School Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={edu.school}
                onChange={(e) =>
                  handleInputChange(index, "school", e.target.value)
                }
                name={`school-${index}`}
                id={`school-${index}`}
                placeholder="School Name"
                className="input-primary"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor={`eduLocation-${index}`} className="label-primary">
              School Location
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={edu.eduLocation}
                placeholder="School Location"
                onChange={(e) =>
                  handleInputChange(index, "eduLocation", e.target.value)
                }
                name={`eduLocation-${index}`}
                id={`eduLocation-${index}`}
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
                type="date"
                value={edu.eduStart}
                onChange={(e) =>
                  handleInputChange(index, "eduStart", e.target.value)
                }
                name={`startDate-${index}`}
                id={`startDate-${index}`}
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
                type="date"
                value={edu.eduEnd}
                onChange={(e) =>
                  handleInputChange(index, "eduEnd", e.target.value)
                }
                name={`eduEnd-${index}`}
                id={`eduEnd-${index}`}
                placeholder="End Date"
                className="input-primary"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor={`eduDesc-${index}`} className="label-primary">
              Description
            </label>
            <div className="mt-2">
              <textarea
                id={`eduDesc-${index}`}
                name={`eduDesc-${index}`}
                value={edu.eduDesc}
                onChange={(e) =>
                  handleInputChange(index, "eduDesc", e.target.value)
                }
                rows={3}
                placeholder="A brief description of your education"
                className="input-primary"
              />
            </div>
          </div>
          <div className="col-span-full">
            <button
              type="button"
              onClick={() => dispatch(removeEducation(index))}
              className="btn-primary bg-red-500"
            >
              <MdDelete size="2rem" className="mr-2" />
            </button>
          </div>
        </div>
      ))}

      <div className="col-span-full">
        <button
          type="button"
          onClick={() => dispatch(addEducation())}
          className="btn-primary mt-4"
        >
          Add Education
        </button>
      </div>
    </div>
  );
};

export default Education;
