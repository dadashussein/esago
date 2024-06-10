import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import fetchWithAuth from '~/utils/api';


export const postInfo = createAsyncThunk(
	'personal/postInfo',
	async ({ info, cvId }, thunkAPI) => {
		try {
			const data = await fetchWithAuth(`cvs/${cvId}`, {
				method: 'PUT',
				body: JSON.stringify(info)
			});
			return data;

		} catch (err) {
			return thunkAPI.rejectWithValue(err.message || 'Something went wrong');
		}
	}
);

export const fetchInfo = createAsyncThunk(
	'personal/fetchInfo',
	async (cvId) => {
		const data = await fetchWithAuth(`cvs/${cvId}`);
		return data;
	}
);

export const patchPhoto = async ({ cvId, file }) => {

	const formData = new FormData();
	formData.append("file", file);

	try {
		const response = await fetchWithAuth(`cvs/${cvId}/photo`, {
			method: 'PATCH',
			body: formData
		});
		return response;
	} catch (err) {
		console.log(err);
	}
}


const initialState = {
	status: 'idle',
	error: null,
	personal: {
		title: '',
		first_name: '',
		last_name: '',
		job_title: '',
		address: '',
		phone_number: '',
		email: '',
		bio: ''
	}
};

const personalSlice = createSlice({
	name: 'personal',
	initialState,
	reducers: {
		setPersonalField: (state, action) => {
			const { field, value } = action.payload;
			state.personal[field] = value;
		}
	},
	extraReducers: (builder) => {
		builder
			// .addCase(createCv.pending, (state) => {
			// 	state.status = 'loading';
			// })
			// .addCase(createCv.fulfilled, (state, action) => {
			// 	state.status = 'succeeded';
			// 	state.cvId = action.payload.id;
			// 	state.personal = {
			// 		title: '',
			// 		first_name: '',
			// 		last_name: '',
			// 		job_title: '',
			// 		address: '',
			// 		phone_number: '',
			// 		email: '',
			// 		bio: ''
			// 	};
			// })
			// .addCase(createCv.rejected, (state, action) => {
			// 	state.status = 'failed';
			// 	state.error = action.payload;
			// })
			.addCase(fetchInfo.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchInfo.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.personal = action.payload;
			})
			.addCase(fetchInfo.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(postInfo.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(postInfo.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.personal = { ...state.personal, ...action.payload };
			})
			.addCase(postInfo.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	}
});

export const { setPersonalField } = personalSlice.actions;

export default personalSlice.reducer;
