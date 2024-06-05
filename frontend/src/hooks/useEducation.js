import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { deleteEducation, fetchEducation, postEducation } from "~/store/features/education/educationThunks";
import { addEducation, removeEducation, setEducationField } from "~/store/features/education/educationSlice";

const useEducation = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const dispatch = useDispatch();
	const education = useSelector((state) => state.education.education);

	const handleAddEducation = (e) => {
		e.preventDefault();
		dispatch(addEducation());
		setCurrentIndex(education.length);
		dispatch(postEducation({ education: education[currentIndex] }));
		//dispatch(fetchEducation(token));
	};

	const handleInputChange = (field, value) => {
		dispatch(setEducationField({ index: currentIndex, field, value }));
	};

	const handleRemoveEducation = () => {
		const token = localStorage.getItem("accessToken");
		dispatch(deleteEducation({ token, id: education[currentIndex].id }));
		dispatch(removeEducation(currentIndex));
		dispatch(fetchEducation(token));
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
