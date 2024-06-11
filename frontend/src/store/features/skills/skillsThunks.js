import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchWithAuth from "~/utils/api";

export const postSkills = createAsyncThunk(
    'skills/addSkill',
    async ({ skillName, cvId }, thunkAPI) => {
        try {
            const response = await fetchWithAuth(`/skills/${cvId}`, {
                method: 'POST',
                body: JSON.stringify(skillName),
            })
            return response;

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.detail)
        }
    }
)

export const getSkills = createAsyncThunk(
    'skills/getSkills',
    async ({ cvId }, thunkAPI) => {
        try {
            const response = await fetchWithAuth(`/skills/${cvId}`)
            return response;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.detail)
        }
    }
)


export const deleteSkill = createAsyncThunk(
    'skills/deleteSkill',
    async ({ skillId, cvId }, thunkAPI) => {
        try {
            await fetchWithAuth(`/skills/${cvId}/${skillId}`, {
                method: 'DELETE',
            })
            return skillId
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.detail)
        }
    }
);