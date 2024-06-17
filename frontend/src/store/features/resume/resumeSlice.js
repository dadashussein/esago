import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "~/utils/api";

export const createCv = createAsyncThunk(
  "cv/cvCreate",
  async ({ title }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/cvs/first", { title });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCv = createAsyncThunk(
  "resume/cvRetrieve",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/cvs");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCVById = createAsyncThunk(
  "resume/fetchCVById",
  async (cvId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/cvs/${cvId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchAllCv = createAsyncThunk(
  "cvs/fetchAllCv",
  async ({ cvId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/cvs/all/${cvId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteCv = createAsyncThunk(
  "resume/cvDelete",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/cvs/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  cv: [],
  allCv: [],
  status: "idle",
  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  extraReducers: (builder) => {
    builder
      // Handle createCv
      .addCase(createCv.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCv.fulfilled, (state, action) => {
        state.loading = false;
        state.cv.push(action.payload);
      })
      .addCase(createCv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchCv
      .addCase(fetchCv.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCv.fulfilled, (state, action) => {
        state.loading = false;
        state.cv = action.payload;
      })
      .addCase(fetchCv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchCVById
      .addCase(fetchCVById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCVById.fulfilled, (state, action) => {
        state.loading = false;
        state.cv = action.payload;
      })
      .addCase(fetchCVById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchAllCv
      .addCase(fetchAllCv.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCv.fulfilled, (state, action) => {
        state.loading = false;
        state.allCv = action.payload;
      })
      .addCase(fetchAllCv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle deleteCv
      .addCase(deleteCv.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCv.fulfilled, (state, action) => {
        state.loading = false;
        state.cv = state.cv.filter((cv) => cv.id !== action.payload);
      })
      .addCase(deleteCv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default resumeSlice.reducer;
