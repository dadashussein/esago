import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExperience,
  removeExperience,
  setExperienceField,
} from "~/store/features/experience/experienceSlice";
import {
  deleteExperience,
  postExperience,
} from "~/store/features/experience/experienceThunks";

const useExperience = ({ cvId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const experience = useSelector((state) => state.experience.experience);

  const handleInputChange = (field, value) => {
    dispatch(setExperienceField({ index: currentIndex, field, value }));
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    dispatch(addExperience());
    setCurrentIndex(experience.length);
    dispatch(postExperience({ cvId, experience: experience[currentIndex] }));
  };

  const handleRemoveExperience = () => {
    dispatch(deleteExperience({ cvId, id: experience[currentIndex].id }));
    dispatch(removeExperience(currentIndex));
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return {
    experience,
    currentIndex,
    setCurrentIndex,
    handleInputChange,
    handleAddExperience,
    handleRemoveExperience,
  };
};

export default useExperience;
