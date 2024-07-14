import { createSlice } from "@reduxjs/toolkit";
import { deleteLanguage, postLanguages } from "./languagesThunks";
import { fetchAllCv } from "../resume/resumeSlice";

const languagesSlice = createSlice({
  name: "languages",
  initialState: {
    languages: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addLanguage: (state, action) => {
      state.languages.push(action.payload);
    },
    removeLanguage: (state, action) => {
      state.languages = state.languages.filter(
        (language, index) => index !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLanguages.fulfilled, (state, action) => {
        state.languages.push(action.payload);
        state.status = "success";
      })
      .addCase(postLanguages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postLanguages.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAllCv.fulfilled, (state, action) => {
        state.languages = action.payload.language;
        state.status = "success";
      })
      .addCase(fetchAllCv.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteLanguage.fulfilled, (state, action) => {
        state.languages = state.languages.filter(
          (language) => language.id !== action.payload,
        );
        state.status = "success";
      })
      .addCase(deleteLanguage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteLanguage.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addLanguage, removeLanguage } = languagesSlice.actions;
export default languagesSlice.reducer;
