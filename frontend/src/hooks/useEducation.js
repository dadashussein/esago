import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { updateEducation, deleteEducation, postEducation } from "~/store/features/education/educationThunks";
import { addEducation, removeEducation, setEducationField } from "~/store/features/education/educationSlice";

const useEducation = (setCurrentSection) => {
	const dispatch = useDispatch();
	const education = useSelector((state) => state.education.education);
	const status = useSelector((state) => state.education.status);
	const [currentIndex, setCurrentIndex] = useState(0);
	const formRef = useRef(null);
	const [isEditing, setIsEditing] = useState(false);
	const [modifiedIndex, setModifiedIndex] = useState(null);


	useEffect(() => {
		if (isEditing && modifiedIndex === null) {
			setModifiedIndex(currentIndex);
		}
	}, [isEditing, currentIndex, modifiedIndex]);


	const handleInputChange = (field, value) => {
		dispatch(setEducationField({ index: currentIndex, field, value }));
	};

	const handleAddEducation = () => {
		dispatch(addEducation());
		setCurrentIndex(education.length);
	};

	const handleRemoveEducation = () => {
		const token = localStorage.getItem("accessToken");
		dispatch(deleteEducation({ token, id: education[currentIndex].id }));
		dispatch(removeEducation(currentIndex));
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};


	const handleUpdateEducation = () => {
		const token = localStorage.getItem("accessToken");
		dispatch(updateEducation({ token, id: education[currentIndex].id, education: education[currentIndex] }));
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		setIsEditing(false);
		handleUpdateEducation();
		setModifiedIndex(null);
	};

	const handleSendAndNext = (e) => {
		e.preventDefault();
		const token = localStorage.getItem("accessToken");
		if (modifiedIndex !== null) {
			dispatch(postEducation({ token, education: [education[modifiedIndex]] }));
			setModifiedIndex(null);
		}
		if (currentIndex < education.length - 1) {
			setCurrentIndex(currentIndex + 1);
		} else {
			setCurrentSection(2);
		}
	};


	return {
		education,
		currentIndex,
		formRef,
		handleAddEducation,
		handleRemoveEducation,
		handleInputChange,
		handleSendAndNext,
		setCurrentIndex,
		handleSaveClick,
		handleUpdateEducation,
		handleEditClick,
		isEditing,
		status,
	};
};

export default useEducation;
