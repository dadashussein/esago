import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
	currenUser: undefined,
	isLoading: false,
};
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
	try {
		const response = await axios.post('http://127.0.0.1:8000/users/register', userData)
		return response.data
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data.detail)
	}
})
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
	try {
		const response = await axios.post('http://127.0.0.1:8000/users/login', userData)
		return response.data
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data.detail)
	}
})
export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, thunkAPI) => {
	try {
		const token = localStorage.getItem('accessToken') ?? ''
		return token
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data.detail)
	}
})

export const logout = createAsyncThunk('auth/logout', async () => {
	localStorage.removeItem('accessToken')
})
const authSlice = createSlice({
	name: "auth",
	initialState,
	extraReducers: builder => {
		builder.addCase(register.pending, state => {
			state.isLoading = true
		});
		builder.addCase(register.fulfilled, (state, action) => {
			state.isLoading = false
			state.currenUser = action.payload
		})
		builder.addCase(register.rejected, state => {
			state.isLoading = false
		})
		builder.addCase(login.pending, state => {
			state.isLoading = true
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.isLoading = false
			state.currenUser = action.payload
		})
		builder.addCase(login.rejected, state => {
			state.isLoading = false
		})
		builder.addCase(getCurrentUser.pending, state => {
			state.isLoading = true
		});
		builder.addCase(getCurrentUser.fulfilled, (state, action) => {
			state.isLoading = false
			state.currenUser = action.payload
		})
		builder.addCase(getCurrentUser.rejected, state => {
			state.isLoading = false
			state.currenUser = null
		})
		builder.addCase(logout.fulfilled, state => {
			state.isLoading = false
			state.currenUser = null
		})
	}
});


export default authSlice.reducer;