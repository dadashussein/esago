import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { deleteEducation, postEducation } from "~/store/features/education/educationThunks";
import { addEducation, removeEducation, setEducationField } from "~/store/features/education/educationSlice";

const useEducation = (setCurrentSection) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const dispatch = useDispatch();
	const education = useSelector((state) => state.education.education);

	const handleAddEducation = () => {
		dispatch(addEducation());
		setCurrentIndex(education.length);
	};

	const handleInputChange = (field, value) => {
		dispatch(setEducationField({ index: currentIndex, field, value }));
	};

	const handleRemoveEducation = () => {
		const token = localStorage.getItem("accessToken");
		dispatch(deleteEducation({ token, id: education[currentIndex].id }));
		dispatch(removeEducation(currentIndex));
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	const handlePostEducation = () => {
		const token = localStorage.getItem("accessToken");
		dispatch(postEducation({ token, education }));
		setCurrentSection(2);
	}


	return {
		education,
		currentIndex,
		handleAddEducation,
		handleRemoveEducation,
		handleInputChange,
		setCurrentIndex,
		handlePostEducation,
	};
};

export default useEducation;
