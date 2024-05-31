// In educationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// export const postEducation = createAsyncThunk(
// 	'education/addEducation',
// 	async ({ token, education }) => {
// 		const response = await fetch('http://127.0.0.1:8000/educations', {
// 			method: 'POST',
// 			headers: {
// 				Authorization: `Bearer ${token}`,
// 			},
// 			body: education,
// 		})
// 		const data = await response.json();
// 		return data;
// 	});

export const fetchEducation = createAsyncThunk(
	'education/fetchEducation',
	async (token) => {
		const response = await fetch("http://127.0.0.1:8000/educations", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		return data;
	}
);


export const deleteEducation = createAsyncThunk(
	'education/deleteEducation',
	async ({ token, id }) => {
		const response = await fetch(`http://127.0.0.1:8000/educations/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		return data;
	}
);

const educationSlice = createSlice({
	name: 'education',
	initialState: {
		education: [],
		status: 'idle',
		error: null,
	},
	reducers: {
		addEducation: (state) => {
			state.education.push({
				school_name: '',
				location: '',
				degree: '',
				field_of_study: '',
				start_date: '',
				end_date: '',
				description: '',
			});
		},
		setEducationField: (state, action) => {
			const { index, field, value } = action.payload;
			state.education[index][field] = value;
		},
		removeEducation: (state, action) => {
			state.education.splice(action.payload, 1);
		},
	},
	extraReducers: (builder) => {
		builder
			// .addCase(postEducation.pending, (state) => {
			// 	state.status = 'loading';
			// }
			// )
			// .addCase(postEducation.fulfilled, (state, action) => {
			// 	state.status = 'succeeded';
			// 	state.education.push(action.payload);
			// }
			// )
			// .addCase(postEducation.rejected, (state, action) => {
			// 	state.status = 'failed';
			// 	state.error = action.error.message;
			// }
			// )
			.addCase(fetchEducation.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchEducation.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.education = action.payload;
			})
			.addCase(fetchEducation.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(deleteEducation.fulfilled, (state, action) => {
				state.education = state.education.filter(
					(education) => education.id !== action.payload
				);
			});
	},
});

export const { addEducation, setEducationField, removeEducation } = educationSlice.actions;

export default educationSlice.reducer;
