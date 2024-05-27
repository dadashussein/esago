import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	education: [
		{
			school: '',
			degree: '',
			eduLocation: '',
			field: '',
			eduStart: '',
			eduEnd: '',
			eduDesc: ''
		}
	]
};

const educationSlice = createSlice({
	name: 'education',
	initialState,
	reducers: {
		addEducation: (state) => {
			state.education.push({
				school: '',
				degree: '',
				eduLocation: '',
				field: '',
				eduStart: '',
				eduEnd: '',
				eduDesc: ''
			});

		},
		setEducationField: (state, action) => {
			const { index, field, value } = action.payload;
			state.education[index][field] = value;
		},
		removeEducation: (state, action) => {
			if (state.education.length > 1) {
				state.education.splice(action.payload, 1);
			}
		}
	}
});

export const { addEducation, setEducationField, removeEducation } = educationSlice.actions;

export default educationSlice.reducer;
