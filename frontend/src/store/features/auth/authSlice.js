import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import fetchWithAuth, { baseUrl } from "~/utils/api";
const initialState = {
  currentUser: undefined,
  isLoading: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/users/register`, userData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.detail);
    }
  },
);
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/users/login`, userData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.detail);
    }
  },
);
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const data = await fetchWithAuth("/users/me");
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.detail);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  Cookies.remove("accessToken");
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(register.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.isLoading = false;
      state.currentUser = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.currentUser = null;
    });
  },
});

export default authSlice.reducer;
