
import { createSlice } from '@reduxjs/toolkit';

const skillSlice = createSlice({
	name: 'skills',
	initialState: {
		skills: [],
	},
	reducers: {
		addSkill: (state, action) => {
			state.skills.push(action.payload);
		},
		removeSkill: (state, action) => {
			state.skills = state.skills.filter((skill, index) => index !== action.payload);
		},
	},
});


export const { addSkill, removeSkill } = skillSlice.actions;


export default skillSlice.reducer;