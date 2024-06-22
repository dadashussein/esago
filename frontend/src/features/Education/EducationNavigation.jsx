import { ArrowLeft, ArrowRight } from "lucide-react";

const EducationNavigation = ({ currentIndex, education, setCurrentIndex }) => {
  return (
    <div className="flex relative items-center gap-[12rem]">
      {education.length > 1 && (
        <div className="flex justify-center gap-8 mt-4">
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            className="border hover:bg-gray-200"
          >
            <ArrowLeft size="1.5rem" />
          </button>
          <span className="text-gray-600">
            {currentIndex + 1} of {education.length}
          </span>
          <button
            type="button"
            onClick={() =>
              setCurrentIndex((prev) =>
                Math.min(prev + 1, education.length - 1),
              )
            }
            className="border hover:bg-gray-200"
          >
            <ArrowRight size="1.5rem" />
          </button>
        </div>
      )}
    </div>
  );
};

export default EducationNavigation;
