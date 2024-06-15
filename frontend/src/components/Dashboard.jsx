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
import Modal from "react-modal";
import ReadyCv from "./ReadyCv";

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
    console.log(`Deleting CV with ID: ${cvId}`);
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

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
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

      {/* Modal for creating CV */}
      <Modal
        isOpen={showInput}
        style={customStyles}
        onRequestClose={() => setShowInput(false)}
      >
        <h2 className="text-xl  dark:text-white font-bold mb-4">
          Create New CV
        </h2>
        <input
          type="text"
          value={cvTitle}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          className="input-primary w-full p-2 mb-4"
          placeholder="Enter CV title"
        />
        <button
          onClick={handleCreate}
          className="text-white button-primary w-full"
        >
          Create CV
        </button>
      </Modal>

      {/* Modal for viewing and actions */}
      <Modal
        isOpen={isModalOpen}
        style={{
          content: {
            width: "80%",
            left: "20%",
            right: "0",
            background: "#fff",
            top: "0%",
            bottom: "0%",
          },
        }}
        onRequestClose={closeModal}
      >
        {selectedCv && (
          <div className="relative">
            <h2 className="text-xl dark:text-white font-bold mb-4">
              {cv.find((item) => item.id === selectedCv).title}
            </h2>
            {/* <Document file={`/path/to/pdf/${selectedCv}.pdf`}>
              <Page pageNumber={1} />
            </Document> */}
            {/* <img className="top-20 absolute" src={dad} alt="" /> */}
            <div className="top-20 border absolute">
              <ReadyCv cvId={cvId} />
            </div>
            {/* <Preview /> */}
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
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};

export default Dashboard;
