import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  createCv,
  deleteCv,
  fetchCv,
} from "@/store/features/resume/resumeSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const useCv = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cv = useSelector((state) => state.resumes.cv);
  const [cvTitle, setCvTitle] = useState("");
  const [selectedCv, setSelectedCv] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    navigate(`${resultAction.id}`);
    setCvTitle("");
  };

  const handlePreview = (cvId) => {
    setSelectedCv(cvId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCv(null);
  };

  return {
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
  };
};

export default useCv;
