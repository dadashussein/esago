import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/api";

export const postExperience = createAsyncThunk(
  "experience/addExperience",
  async ({ cvId, experience }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/experiences/${cvId}`,
        experience,
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.detail);
    }
  },
);

export const fetchExperience = createAsyncThunk(
  "experience/fetchExperience",
  async ({ cvId }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/experiences/${cvId}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.detail);
    }
  },
);

export const deleteExperience = createAsyncThunk(
  "experience/deleteExperience",
  async ({ cvId, id }) => {
    await axiosInstance.delete(`/experiences/${cvId}/${id}`);
    return id;
  },
);

export const updateExperience = createAsyncThunk(
  "experience/updateExperience",
  async ({ id, experience }) => {
    const response = await axiosInstance.put(`/experiences/${id}`, experience);
    return response.data;
  },
);
