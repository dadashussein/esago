import ReactiveButton from "@/components/common/ReactiveButton";
import { Plus } from "lucide-react";
import { useState } from "react";

const validateField = (name, value) => {
  switch (name) {
    case "school_name":
    case "location":
    case "degree":
    case "field_of_study":
      if (!value.trim()) {
        return `${name.replace(/_/g, " ")} is required`;
      }
      break;
    case "start_date":
    case "end_date":
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return `${name.replace(/_/g, " ")} must be in the format YYYY-MM-DD`;
      }
      break;
    default:
      return "";
  }
  return "";
};

const EducationForm = ({
  currentIndex,
  education,
  status,
  handleInputChange,
  handleAddEducation,
}) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;

    for (const field of [
      "school_name",
      "location",
      "degree",
      "field_of_study",
      "start_date",
      "end_date",
      "description",
    ]) {
      const error = validateField(
        field,
        education[currentIndex]?.[field] || "",
      );
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (isValid) {
      handleAddEducation(e);
    }
  };

  const handleChange = (name, value) => {
    handleInputChange(name, value);
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-6"
    >
      {["school_name", "location", "degree", "field_of_study"].map((field) => (
        <div className="sm:col-span-3" key={field}>
          <label htmlFor={`${field}-${currentIndex}`} className="label-primary">
            {field.replace(/_/g, " ")}
          </label>
          <input
            type="text"
            required
            value={education[currentIndex]?.[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            name={`${field}-${currentIndex}`}
            id={`${field}-${currentIndex}`}
            placeholder={field.replace(/_/g, " ")}
            className="input-primary"
          />
          {errors[field] && (
            <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
          )}
        </div>
      ))}
      {["start_date", "end_date"].map((field) => (
        <div className="sm:col-span-3" key={field}>
          <label htmlFor={`${field}-${currentIndex}`} className="label-primary">
            {field.replace(/_/g, " ")}
          </label>
          <input
            type="text"
            required
            value={education[currentIndex].field}
            onChange={(e) => handleChange(field, e.target.value)}
            name={`${field}-${currentIndex}`}
            id={`${field}-${currentIndex}`}
            placeholder={field.replace(/_/g, " ")}
            className="input-primary"
          />
          {errors[field] && (
            <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
          )}
        </div>
      ))}
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
            value={education[currentIndex]?.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
            placeholder="A brief description of your education"
            className="input-primary"
          />
          <ReactiveButton
            className={
              "p-2 bg-primary-500 cursor-pointer  text-white hover:bg-primary-600 duration-200 ease-linear rounded-md"
            }
            disabled={status === "succeeded"}
            icon={<Plus size={"1.2rem"} />}
            status={status}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </form>
  );
};

export default EducationForm;
