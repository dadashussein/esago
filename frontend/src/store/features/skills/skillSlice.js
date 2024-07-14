import { createSlice } from "@reduxjs/toolkit";
import { deleteSkill, postSkills } from "./skillsThunks";
import { fetchAllCv } from "../resume/resumeSlice";

const skillSlice = createSlice({
  name: "skills",
  initialState: {
    skills: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    removeSkill: (state, action) => {
      state.skills = state.skills.filter(
        (skill, index) => index !== action.payload,
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(postSkills.fulfilled, (state, action) => {
        state.skills.push(action.payload);
        state.status = "success";
      })
      .addCase(postSkills.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postSkills.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAllCv.fulfilled, (state, action) => {
        state.skills = action.payload.skill;
        state.status = "success";
      })
      .addCase(fetchAllCv.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter(
          (skill) => skill.id !== action.payload,
        );
        state.status = "success";
      })
      .addCase(deleteSkill.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSkill.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addSkill, removeSkill } = skillSlice.actions;

export default skillSlice.reducer;
