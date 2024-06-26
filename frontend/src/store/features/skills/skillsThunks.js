import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/api";

export const postSkills = createAsyncThunk(
  "skills/addSkill",
  async ({ skillName, cvId }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/skills/${cvId}`, skillName);
      return response.data["data"];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.detail);
    }
  },
);

export const deleteSkill = createAsyncThunk(
  "skills/deleteSkill",
  async ({ skillId, cvId }, thunkAPI) => {
    try {
      await axiosInstance.delete(`/skills/${cvId}/${skillId}`);
      return skillId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.detail);
    }
  },
);
