import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { deleteEducation, postEducation } from "~/store/features/education/educationThunks";
import { addEducation, removeEducation, setEducationField } from "~/store/features/education/educationSlice";

const useEducation = ({ cvId }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const dispatch = useDispatch();
	const education = useSelector((state) => state.education.education);

	const handleAddEducation = (e) => {
		e.preventDefault();
		dispatch(addEducation());
		setCurrentIndex(education.length);
		dispatch(postEducation({ cvId, education: education[currentIndex] }));
	};

	const handleInputChange = (field, value) => {
		dispatch(setEducationField({ index: currentIndex, field, value }));
	};

	const handleRemoveEducation = () => {
		dispatch(deleteEducation({ cvId, id: education[currentIndex].id }));
		dispatch(removeEducation(currentIndex));
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	return {
		education,
		currentIndex,
		handleAddEducation,
		handleRemoveEducation,
		handleInputChange,
		setCurrentIndex,
	};
};

export default useEducation;
