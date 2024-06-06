import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



export const postInfo = createAsyncThunk(
	'personal/postInfo',
	async ({ info, cvId }, thunkAPI) => {
		try {
			const token = localStorage.getItem('accessToken');
			const response = await fetch(`http://127.0.0.1:8000/cvs`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ ...info, id: cvId })
			});
			const data = await response.json();
			return data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.message || 'Something went wrong');
		}
	}
);

export const fetchInfo = createAsyncThunk(
	'personal/fetchInfo',
	async (cvId) => {
		const token = localStorage.getItem('accessToken');
		const response = await fetch(`http://127.0.0.1:8000/cvs/${cvId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const data = await response.json();
		return data;
	}
);

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
