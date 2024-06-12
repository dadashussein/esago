import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCv, deleteCv, fetchCv } from "~/store/features/resume/resumeSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { motion } from "framer-motion";
import sas from "../assets/sas.jpg"


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
    //console.log("result", resultAction);

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

  return (
    <main className="flex-1 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Hi, {auth?.username}</h2>
        <button
          onClick={() => setShowInput(!showInput)}
          className="bg-green-200 text-green-700 font-semibold py-2 px-4 rounded-full"
        >
          {showInput ? "Cancel" : "Create New Cv"}
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: showInput ? 1 : 0, height: showInput ? "auto" : 0 }}
        className="overflow-hidden mb-8"
      >
        <div className="flex items-center">
          <input
            type="text"
            value={cvTitle}
            onChange={handleInputChange}
            placeholder="Enter CV Title"
            className="border border-gray-300 p-2 rounded mr-2 flex-1"
          />
          <button
            onClick={handleCreate}
            className="bg-green-200 text-green-700 font-semibold py-2 px-4 rounded-full"
          >
            Create
          </button>
        </div>
      </motion.div>
      <h3 className="text-2xl font-bold mb-4">Let&apos;s check your resume!</h3>
      <p className="text-gray-500 mb-8">There are a lot of templates for your resume.</p>
      <div className="grid grid-cols-4 gap-6">
        {cv.map((item) => (
          <div key={item.id} className="relative  w-[300px]  bg-yellow-100 p-6 rounded-lg group">
            <img src={sas} alt="cv" className="w-full h-40 object-cover rounded-lg" />
            <p className="text-center font-semibold mt-4">{item.title}</p>
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0  bg-opacity-75 flex flex-col justify-center items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <button onClick={() => handleDownload(item.id)} className="bg-blue-500 text-white py-1 px-3 rounded">Download</button>
              <button onClick={() => handleEdit(item.id)} className="bg-green-500 text-white py-1 px-3 rounded">Edit</button>
              <button onClick={() => handlePreview(item.id)} className="bg-yellow-500 text-white py-1 px-3 rounded">Preview</button>
              <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white py-1 px-3 rounded">Delete</button>
            </motion.div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
