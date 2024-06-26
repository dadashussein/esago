import {
  addExperience,
  removeExperience,
  setExperienceField,
} from "@/store/features/experience/experienceSlice";
import {
  deleteExperience,
  postExperience,
} from "@/store/features/experience/experienceThunks";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useExperience = ({ cvId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const experience = useSelector((state) => state.experience.experience);
  const statusExperience = useSelector((state) => state.experience.status);

  const handleAddExperience = (e) => {
    e.preventDefault();
    dispatch(postExperience({ cvId, experience: experience[currentIndex] }));
  };

  const handleInputChange = (field, value) => {
    dispatch(setExperienceField({ index: currentIndex, field, value }));
  };

  const addNewItem = () => {
    dispatch(addExperience());
    setCurrentIndex(experience.length);
  };

  const handleRemoveExperience = useCallback(() => {
    const currentExperience = experience[currentIndex];
    if (currentExperience.id) {
      dispatch(deleteExperience({ cvId, id: currentExperience.id }));
    }
    dispatch(removeExperience(currentIndex));
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [dispatch, cvId, currentIndex, experience]);

  return {
    experience,
    statusExperience,
    addNewItem,
    handleAddExperience,
    handleInputChange,
    handleRemoveExperience,
    setCurrentIndex,
    currentIndex,
  };
};

export default useExperience;
