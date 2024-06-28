import axiosInstance from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const postLanguages = createAsyncThunk(
  "languages/postLanguages",
  async ({ language, cvId }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/languages/${cvId}`, language);
      return response.data["data"];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.detail);
    }
  },
);

export const deleteLanguage = createAsyncThunk(
  "languages/deleteLanguage",
  async ({ languageId, cvId }, thunkAPI) => {
    try {
      await axiosInstance.delete(`/languages/${cvId}/${languageId}`);
      return languageId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.detail);
    }
  },
);
