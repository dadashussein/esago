import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCv, deleteCv, fetchCv } from "~/store/features/resume/resumeSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cv = useSelector((state) => state.resumes.cv);
  const [hoveredCv, setHoveredCv] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cvTitle, setCvTitle] = useState("");

  useEffect(() => {
    dispatch(fetchCv());
  }, [dispatch]);

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleDelete = (cvId) => {
    dispatch(deleteCv({ id: cvId }));
    console.log(`Deleting CV with ID: ${cvId}`);
  };

  const handleDownload = (cvId) => {
    console.log(`Downloading CV with ID: ${cvId}`);
  };

  const handleModalSubmit = async () => {
    if (cvTitle.trim()) {
      const action = await dispatch(createCv({ title: cvTitle }));
      const resultAction = unwrapResult(action);
      console.log("result", resultAction);

      navigate(`dashboard/${resultAction.id}`);
      setIsModalOpen(false);
      setCvTitle("");
    }
  };

  const handleEdit = (cvId) => {
    navigate(`dashboard/${cvId}`);
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <h1 className="text-center text-[60px]">Your dashboard</h1>
      <div className="flex flex-col items-center w-full">
        <div className="flex gap-2">
          <AnimatePresence>
            {cv &&
              cv.map((cvItem, index) => (
                <motion.div
                  key={index}
                  className="border hover:border-2 h-[10rem] w-[7rem] border-primary-500 relative"
                  onMouseEnter={() => setHoveredCv(index)}
                  onMouseLeave={() => setHoveredCv(null)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1>{cvItem.title}</h1>
                  {hoveredCv === index && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75">
                      <button
                        className="btn btn-primary mb-2"
                        onClick={() => handleEdit(cvItem.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleDownload(cvItem.id)}
                      >
                        Download
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleDelete(cvItem.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
        <div className="justify-center items-center w-[50rem] mt-4">
          <button className="btn btn-primary" onClick={handleCreate}>
            + Create New
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl mb-2">Enter CV Title</h2>
            <input
              type="text"
              value={cvTitle}
              onChange={(e) => setCvTitle(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <div className="flex justify-end">
              <button
                className="btn btn-secondary mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleModalSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
