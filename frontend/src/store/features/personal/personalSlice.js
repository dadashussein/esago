import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export const createCv = createAsyncThunk(
	'cv/create',
	async ({ info }) => {
		const token = localStorage.getItem('accessToken')
		const response = await fetch('http://127.0.0.1:8000/cvs', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(info)
		})
		const data = await response.json()
		const cvId = data.id
		localStorage.setItem('cvId', cvId)
		return data
	}
)


export const fetchInfo = createAsyncThunk(
	'personal/fetchInfo',
	async (token) => {
		const cvId = localStorage.getItem('cvId')
		//console.log(cvId);
		const response = await fetch(`http://127.0.0.1:8000/cvs/${cvId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const data = await response.json()
		//console.log(data);
		return data
	}
)

const initialState = {
	status: 'idle',
	error: null,
	personal: {}
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
			.addCase(fetchInfo.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchInfo.fulfilled, (state, action) => {
				state.personal = action.payload
			})
			.addCase(fetchInfo.rejected, (state, action) => {
				state.status = 'failed',
					state.error = action.payload.message
			})
		// .addCase(postInfo.pending, (state) => {
		// 	state.status = 'loading'
		// })
		// .addCase(postInfo.fulfilled, (state) => {
		// 	state.status = 'succceeded'
		// })
		// .addCase(postInfo.rejected, (state, action) => {
		// 	state.status = 'failed',
		// 		state.error = action.payload.message
		// })
	}
});

export const {
	setPersonalField,
} = personalSlice.actions;

export default personalSlice.reducer;
