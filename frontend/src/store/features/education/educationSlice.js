import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	school: 'School Name',
	degree: 'Degree',
	eduLocation: 'Location',
	field: 'Field of Study',
	eduStart: 'Start Date',
	eduEnd: 'End Date',
	eduDesc: 'Description',
};

const educationSlice = createSlice({
	name: 'education',
	initialState,
	reducers: {
		setSchool: (state, action) => {
			state.school = action.payload;
		},
		setDegree: (state, action) => {
			state.degree = action.payload;
		},
		setEduLocation: (state, action) => {
			state.eduLocation = action.payload;
		},
		setField: (state, action) => {
			state.field = action.payload;
		},
		setEduStart: (state, action) => {
			state.eduStart = action.payload;
		},
		setEduEnd: (state, action) => {
			state.eduEnd = action.payload;
		},
		setEduDesc: (state, action) => {
			state.eduDesc = action.payload;
		},
	},
});

export const {
	setSchool,
	setDegree,
	setEduLocation,
	setField,
	setEduStart,
	setEduEnd,
	setEduDesc,
} = educationSlice.actions;

export default educationSlice.reducer;
