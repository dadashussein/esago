
import { createSlice } from '@reduxjs/toolkit';
import { deleteSkill, getSkills, postSkills } from './skillsThunks';

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

	extraReducers: (builder) => {
		builder
			.addCase(postSkills.fulfilled, (state, action) => {
				state.skills.push(action.payload);
			})
			.addCase(postSkills.rejected, (state, action) => {
				console.log(action.payload);
			})
			.addCase(getSkills.fulfilled, (state, action) => {
				state.skills = action.payload;
			})
			.addCase(getSkills.rejected, (state, action) => {
				console.log(action.payload);
			})
			.addCase(deleteSkill.fulfilled, (state, action) => {
				state.skills = state.skills.filter((skill) => skill.id !== action.payload);
			})
			.addCase(deleteSkill.rejected, (state, action) => {
				console.log(action.payload);
			});
	}
});


export const { addSkill, removeSkill } = skillSlice.actions;


export default skillSlice.reducer;