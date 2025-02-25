import { createSlice } from "@reduxjs/toolkit";
import {
  deleteEducation,
  postEducation,
  updateEducation,
} from "./educationThunks";
import { fetchAllCv } from "../resume/resumeSlice";

const educationSlice = createSlice({
  name: "education",
  initialState: {
    education: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addEducation: (state) => {
      state.education.push({
        school_name: "",
        location: "",
        degree: "",
        field_of_study: "",
        start_date: "",
        end_date: "",
        description: "",
      });
    },
    setEducationField: (state, action) => {
      const { index, field, value } = action.payload;
      state.education[index][field] = value;
      state.status = "idle";
    },
    removeEducation: (state, action) => {
      state.education.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postEducation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postEducation.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postEducation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAllCv.fulfilled, (state, action) => {
        state.education = action.payload.education;
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.education = state.education.filter(
          (education) => education.id !== action.payload,
        );
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(updateEducation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEducation.fulfilled, (state, action) => {
        const index = state.education.findIndex(
          (education) => education.id === action.payload.id,
        );
        if (index !== -1) {
          state.education[index] = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addEducation, setEducationField, removeEducation } =
  educationSlice.actions;

export default educationSlice.reducer;
