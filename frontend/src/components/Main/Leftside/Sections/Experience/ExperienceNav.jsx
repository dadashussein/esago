import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const ExperienceNav = ({ currentIndex, experience, setCurrentIndex }) => {
  return (
    <div className="flex relative items-center gap-[12rem]">
      {experience.length > 1 && (
        <div className="flex justify-center gap-8 mt-4">
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
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
                Math.min(prev + 1, experience.length - 1),
              )
            }
            className="border hover:bg-gray-200"
          >
            <GrFormNext size="1.5rem" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceNav;
