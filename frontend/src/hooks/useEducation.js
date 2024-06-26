import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addEducation,
  removeEducation,
  setEducationField,
} from "@/store/features/education/educationSlice";
import {
  deleteEducation,
  postEducation,
} from "@/store/features/education/educationThunks";

const useEducation = ({ cvId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const education = useSelector((state) => state.education.education);
  const status = useSelector((state) => state.education.status);

  const handleAddEducation = (e) => {
    e.preventDefault();
    dispatch(postEducation({ cvId, education: education[currentIndex] }));
  };

  const handleInputChange = (field, value) => {
    dispatch(setEducationField({ index: currentIndex, field, value }));
  };

  const addNewItem = () => {
    dispatch(addEducation());
    setCurrentIndex(education.length);
  };

  const handleRemoveEducation = () => {
    const currentEducation = education[currentIndex];
    if (currentEducation.id) {
      dispatch(deleteEducation({ cvId, id: currentEducation.id }));
    }
    dispatch(removeEducation(currentIndex));
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return {
    education,
    status,
    currentIndex,
    handleAddEducation,
    addNewItem,
    handleRemoveEducation,
    handleInputChange,
    setCurrentIndex,
  };
};

export default useEducation;
