import { createSlice } from "@reduxjs/toolkit";
import {
  deleteExperience,
  postExperience,
  updateExperience,
} from "./experienceThunks";
import { fetchAllCv } from "../resume/resumeSlice";

const experienceSlice = createSlice({
  name: "experience",
  initialState: {
    experience: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addExperience: (state) => {
      state.experience.push({
        job_title: "",
        company_name: "",
        location: "",
        start_date: "",
        end_date: "",
        description: "",
      });
    },
    setExperienceField: (state, action) => {
      const { index, field, value } = action.payload;
      state.experience[index][field] = value;
      state.status = "idle";
    },
    removeExperience: (state, action) => {
      state.experience.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postExperience.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postExperience.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAllCv.fulfilled, (state, action) => {
        state.experience = action.payload.experience;
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.experience = state.experience.filter(
          (experience) => experience.id !== action.payload,
        );
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(updateExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        const index = state.experience.findIndex(
          (experience) => experience.id === action.payload.id,
        );
        if (index !== -1) {
          state.experience[index] = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addExperience, setExperienceField, removeExperience } =
  experienceSlice.actions;

export default experienceSlice.reducer;
