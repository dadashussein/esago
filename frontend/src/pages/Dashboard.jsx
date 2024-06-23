import { useSelector } from "react-redux";
import useCv from "@/hooks/useCv";
import CvModal from "@/components/cv/CvModal";
import ReadyCv from "@/components/cv/ReadyCv";
import CreateCvButton from "@/components/cv/CreateCvButton";
import CvList from "@/components/cv/CvList";
import cv1 from "@/assets/svgs/cv1.svg";
import cv2 from "@/assets/svgs/cv2.svg";
import './Dashboard.css';

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
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
    closeModal
  } = useCv();

  const lightColors = ["#CCFFEA", "#D0CCFF", "#FFCCD0", "#FEC"];
  const darkColors = ["#2A3C35", "#708F82", "#C9D9D2", "#F0FFF9"];

  const exampleCv = [cv1, cv2];

  return (
    <main className="">
      <div className="">
        <h3 className="  text-lg 
        dark:text-darkColor-text dark:bg-darkColor-menu
        py-3 px-2 md:text-[30px]">
          Hi, {currentUser?.username}
        </h3>

        <h3 className="text-lg 
        dark:text-darkColor-text
        md:text-[25px] py-3 px-2">
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
        handleDownload={(cvId) => console.log(`Downloading CV with ID: ${cvId}`)}
        selectedCv={selectedCv}
        onClose={closeModal}
      >
        {selectedCv && (
          <div className="relative flex flex-col items-center p-4 max-w-full overflow-auto">
            <ReadyCv cvId={selectedCv} />
          </div>
        )}
      </CvModal>
    </main>
  );
};

export default Dashboard;
