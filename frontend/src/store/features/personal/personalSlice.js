import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



// export const postInfo = createAsyncThunk(
// 	'personal/postInfo',
// 	async ({ token, personal }) => {
// 		console.log(personal);
// 		const response = await fetch('http://127.0.0.1:8000/users/update', {
// 			method: 'PUT',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${token}`
// 			},
// 			body: JSON.stringify(personal)
// 		});
// 		const data = await response.json();
// 		return data;
// 	})




export const fetchInfo = createAsyncThunk(
	'personal/fetchInfo',
	async (token) => {
		const response = await fetch('http://127.0.0.1:8000/users/me', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const data = await response.json()
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
				state.status = 'succceeded',
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
