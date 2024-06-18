import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createCv,
  deleteCv,
  fetchCv,
} from "~/store/features/resume/resumeSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Tilt } from "react-next-tilt";
import { Plus } from "lucide-react";

import ReadyCv from "./ReadyCv";
import Modal from "./Modal";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cv = useSelector((state) => state.resumes.cv);

  const [cvTitle, setCvTitle] = useState("");
  const [cvId, setCvId] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [selectedCv, setSelectedCv] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    dispatch(fetchCv());
  }, [dispatch]);

  const handleDelete = (cvId) => {
    dispatch(deleteCv({ id: cvId }));
    if (cvId === selectedCv) {
      setIsModalOpen(false);
    }
  };

  const handleCreate = async () => {
    if (cvTitle.trim() === "") {
      return;
    }

    const action = await dispatch(createCv({ title: cvTitle }));
    const resultAction = unwrapResult(action);
    console.log("result", resultAction);
    setCvId(resultAction.id);
    navigate(`${resultAction.id}`);
    setCvTitle("");
    setShowInput(false);
  };

  const handleEdit = (cvId) => {
    navigate(`${cvId}`);
  };

  const handleDownload = (cvId) => {
    console.log(`Downloading CV with ID: ${cvId}`);
  };

  const handlePreview = (cvId) => {
    setSelectedCv(cvId);
    setCvId(cvId);
    console.log(`Previewing CV with ID: ${cvId}`);
    setIsModalOpen(true);
  };

  const handleInputChange = (event) => {
    setCvTitle(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCreate();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCv(null);
  };

  return (
    <main className="flex-1 p-4">
      <div>
        <h3 className="text-2xl font-bold text-[#000] dark:text-white mb-4">
          Let's check your resume!
        </h3>
        <p className="mb-8 text-[#000] dark:text-white">
          There are a lot of templates for your resume.
        </p>
        <div></div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div>
            <Tilt width={"10rem"}>
              <div
                className="w-[10rem] h-[16rem] flex items-center relative justify-center
                dark:border-[#686D76] dark
                border border-black shadow-xl"
                onClick={() => setShowInput(true)}
              >
                <Plus />
              </div>
            </Tilt>
          </div>
          <div className="flex gap-2 flex-wrap">
            {cv.map((item) => (
              <div
                key={item.id}
                className="w-[10rem] h-[16rem] flex flex-col items-center justify-center
                dark:border-[#686D76] dark:text-white border border-black shadow-xl"
              >
                <p className="text-white">{item.title}</p>
                <button
                  className="mt-2 p-1 bg-blue-500 text-white rounded"
                  onClick={() => handlePreview(item.id)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[10rem] h-[16rem] flex items-center justify-center dark:border-[#686D76] dark:text-white border border-black shadow-xl">
          templates
        </div>
      </div>

      {showInput && (
        <div className="mt-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 dark:border-[#686D76] dark:bg-[#2E2E2E] dark:text-white"
            placeholder="Enter CV title"
            value={cvTitle}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />
          <button onClick={handleCreate} className="btn-primary mt-2">
            Create
          </button>
        </div>
      )}

      <Modal open={isModalOpen} onClose={closeModal}>
        {selectedCv && (
          <div className="relative ">
            <div className="top-20 border">
              <ReadyCv cvId={cvId} />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleEdit(selectedCv)}
                className="btn-primary"
              >
                Edit
              </button>
              <button
                onClick={() => handleDownload(selectedCv)}
                className="button-secondary"
              >
                Download
              </button>
              <button
                onClick={() => handleDelete(selectedCv)}
                className="button-danger"
              >
                Delete
              </button>
              <h2 className="text-xl dark:text-white font-bold mb-4">
                {cv.find((item) => item.id === selectedCv)?.title}
              </h2>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};

export default Dashboard;
