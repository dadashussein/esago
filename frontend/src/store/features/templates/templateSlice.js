import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/api";
const initialState = {
  status: "idle",
  error: null,
  activeTemplate: 1,
};

export const postTemplate = createAsyncThunk(
  "template/postTemplate",
  async ({ cvId, activeTemplate }, thunkAPI) => {
    try {
      const repsonse = await axiosInstance.patch(
        `/cvs/${cvId}/template/${activeTemplate}`,
      );
      return repsonse.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Something went wrong");
    }
  },
);

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setTemplate: (state, action) => {
      state.activeTemplate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postTemplate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postTemplate.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postTemplate.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default templateSlice.reducer;
export const { setTemplate } = templateSlice.actions;
