import { IoMdAdd } from 'react-icons/io';

const ExperienceForm = ({ currentIndex, experience, handleInputChange, handleAddExperience }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddExperience(e);
    };
    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
            <div className="input-container">
                <label htmlFor={`job_title-${currentIndex}`} className="label-primary">
                    Job title
                </label>
                <input
                    type="text"
                    required
                    value={experience[currentIndex]?.job_title || ""}
                    onChange={(e) => handleInputChange("job_title", e.target.value)}
                    name={`job_title-${currentIndex}`}
                    id={`job_title-${currentIndex}`}
                    placeholder="Job title"
                    className="input-primary"
                />
            </div>
            <div className="input-container">
                <label htmlFor={`company_name-${currentIndex}`} className="label-primary">
                    Company Name
                </label>
                <input
                    type="text"
                    required
                    value={experience[currentIndex]?.company_name || ""}
                    onChange={(e) => handleInputChange("company_name", e.target.value)}
                    name={`company_name-${currentIndex}`}
                    id={`company_name-${currentIndex}`}
                    placeholder="Company Name"
                    className="input-primary"
                />
            </div>
            <div className="input-container">
                <label htmlFor={`location-${currentIndex}`} className="label-primary">
                    Company Location
                </label>
                <input
                    type="text"
                    required
                    value={experience[currentIndex]?.location || ""}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    name={`location-${currentIndex}`}
                    id={`location-${currentIndex}`}
                    placeholder="Location"
                    className="input-primary"
                />
            </div>
            <div className="input-container">
                <label htmlFor="start_date" className="label-primary">
                    Start Date
                </label>
                <input
                    type="year"
                    required
                    value={experience[currentIndex]?.start_date || ""}
                    onChange={(e) => handleInputChange("start_date", e.target.value)}
                    name={`start_date-${currentIndex}`}
                    id={`start_date-${currentIndex}`}
                    placeholder="Start Date"
                    className="input-primary"
                />
            </div>
            <div className="input-container">
                <label htmlFor="end_date" className="label-primary">
                    End Date
                </label>
                <input
                    type="year"
                    required
                    value={experience[currentIndex]?.end_date || ""}
                    onChange={(e) => handleInputChange("end_date", e.target.value)}
                    name={`end_date-${currentIndex}`}
                    id={`end_date-${currentIndex}`}
                    placeholder="End Date"
                    className="input-primary"
                />
            </div>
            <div className="col-span-full">
                <label htmlFor={`description-${currentIndex}`} className="label-primary">
                    Description
                </label>
                <div className="flex gap-4 items-center">
                    <textarea
                        id={`description-${currentIndex}`}
                        name={`description-${currentIndex}`}
                        required
                        value={experience[currentIndex]?.description || ""}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={3}
                        placeholder="A brief description of your education"
                        className="input-primary"
                    />
                    <button type="submit" className="p-2 bg-primary-500 text-white hover:bg-primary-600 duration-200 ease-linear rounded-md">
                        <IoMdAdd />
                    </button>
                </div>
            </div>

        </form>
    )
}

export default ExperienceForm