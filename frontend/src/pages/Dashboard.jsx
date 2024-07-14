import useCv from "@/hooks/useCv";
import CvModal from "@/components/cv/CvModal";
import ReadyCv from "@/components/cv/ReadyCv";
import CreateCvButton from "@/components/cv/CreateCvButton";
import CvList from "@/components/cv/CvList";
import cv1 from "@/assets/svgs/cv1.svg";
import cv2 from "@/assets/svgs/cv2.svg";
import "./Dashboard.css";
import useCompileHtml from "@/hooks/useCompileHtml";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Tailwind } from "@fileforge/react-print";

const Dashboard = () => {
  const {
    cv,
    cvTitle,
    navigate,
    setCvTitle,
    selectedCv,
    isModalOpen,
    handleDelete,
    handleCreate,
    handlePreview,
    closeModal,
  } = useCv();

  const lightColors = ["#CCFFEA", "#D0CCFF", "#FFCCD0", "#FEC"];
  const { compileToHtml, status } = useCompileHtml({ selectedCv });

  const darkColors = ["#2A3C35", "#708F82", "#C9D9D2", "#F0FFF9"];

  const exampleCv = [cv1, cv2];

  const handleGenerate = () => {
    compileToHtml(
      <Provider store={store}>
        <Tailwind>
          <ReadyCv cvId={selectedCv} />
        </Tailwind>
      </Provider>,
    );
  };

  return (
    <main>
      <div>
        <div className="">
          <h3
            className="text-lg 
        dark:text-darkColor-text
        md:text-[25px] py-3 px-2"
          >
            Welcome to your dashboard
          </h3>
        </div>

        <div className="flex py-3 px-4 flex-col gap-4">
          <div className="flex gap-4">
            <CreateCvButton
              cvTitle={cvTitle}
              handleInputChange={(e) => setCvTitle(e.target.value)}
              handleCreate={handleCreate}
            />
          </div>
          <CvList
            cv={cv}
            lightColors={lightColors}
            darkColors={darkColors}
            exampleCv={exampleCv}
            handlePreview={handlePreview}
          />
        </div>

        <CvModal
          open={isModalOpen}
          handleEdit={(cvId) => navigate(`${cvId}`)}
          handleDelete={handleDelete}
          handleGenerate={handleGenerate}
          selectedCv={selectedCv}
          onClose={closeModal}
          status={status}
        >
          {selectedCv && (
            <div className="relative flex flex-col items-center p-4 max-w-full overflow-auto">
              <ReadyCv cvId={selectedCv} />
            </div>
          )}
        </CvModal>
      </div>
    </main>
  );
};

export default Dashboard;
