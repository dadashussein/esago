import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCv, deleteCv, fetchCv } from "~/store/features/resume/resumeSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Tilt } from 'react-next-tilt';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2">

        </button>
        {children}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cv = useSelector((state) => state.resumes.cv);
  
  const [cvTitle, setCvTitle] = useState("");
  const [showInput, setShowInput] = useState(false);
  const auth = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    dispatch(fetchCv());
  }, [dispatch]);

  const handleDelete = (cvId) => {
    dispatch(deleteCv({ id: cvId }));
    console.log(`Deleting CV with ID: ${cvId}`);
  };

  const handleCreate = async () => {
    if (cvTitle.trim() === "") {
      return;
    }

    const action = await dispatch(createCv({ title: cvTitle }));
    const resultAction = unwrapResult(action);
    console.log("result", resultAction);

    navigate(`${resultAction.id}`);
    setCvTitle("");
    setShowInput(false);
  };

  const handleEdit = (cvId) => {
    navigate(`${cvId}`);
  };

  const handleInputChange = (event) => {
    setCvTitle(event.target.value);
  };

  const handleDownload = (cvId) => {
    console.log(`Downloading CV with ID: ${cvId}`);
  };

  const handlePreview = (cvId) => {
    console.log(`Previewing CV with ID: ${cvId}`);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCreate();
    }
  };

  return (
    <main className="flex-1 p-4">
      <div>
        <h3 className="text-2xl font-bold text-[#000] dark:text-white mb-4">
          Let&apos;s check your resume!
        </h3>
        <p className="mb-8 text-[#000] dark:text-white">
          There are a lot of templates for your resume.
        </p>
        <div></div>
      </div>
      <div className="flex flex-col gap-4">
        <Tilt width={"14rem"}>
          <div
            className="w-[14rem] h-[20rem] flex items-center relative justify-center
             dark:border-[#686D76] dark:text-white  border border-black shadow-xl"
            onClick={() => setShowInput(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </Tilt>

        <div className="w-[14rem] h-[20rem] flex items-center justify-center
         dark:border-[#686D76] dark:text-white  border border-black shadow-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        {/* show last cvs */}
        
      </div>

      {/* Modal for creating CV */}
      <Modal isOpen={showInput} onClose={() => setShowInput(false)}>
        <h2 className="text-xl  dark:text-white font-bold mb-4">Create New CV</h2>
        <input
          type="text"
          value={cvTitle}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          className="input-primary w-full p-2 mb-4"
          placeholder="Enter CV title"
        />
        <button onClick={handleCreate} className="text-white button-primary w-full">
          Create CV
        </button>
      </Modal>
    </main>
  );
};

export default Dashboard;



