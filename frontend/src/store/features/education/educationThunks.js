import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/api";

export const postEducation = createAsyncThunk(
  "education/addEducation",
  async ({ cvId, education }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/educations/${cvId}`,
        education,
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.detail);
    }
  },
);

export const deleteEducation = createAsyncThunk(
  "education/deleteEducation",
  async ({ cvId, id }) => {
    await axiosInstance.delete(`/educations/${cvId}/${id}`);
    return id;
  },
);

export const updateEducation = createAsyncThunk(
  "education/updateEducation",
  async ({ id, education }) => {
    const response = await axiosInstance.put(`/educations/${id}`, education);
    return response.data;
  },
);
