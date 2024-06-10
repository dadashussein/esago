import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchWithAuth from "~/utils/api";

export const postExperience = createAsyncThunk(
    'experience/addExperience',
    async ({ cvId, experience }, thunkAPI) => {
        try {
            const data = await fetchWithAuth(`/experiences/${cvId}`, {
                method: 'POST',
                body: JSON.stringify(experience),
            });
            return data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.detail);
        }
    }
);

export const fetchExperience = createAsyncThunk(
    'experience/fetchExperience',
    async ({ cvId }, thunkAPI) => {
        try {
            const data = await fetchWithAuth(`/experiences/${cvId}`);
            return data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.detail);
        }
    }
);

export const deleteExperience = createAsyncThunk(
    'experience/deleteExperience',
    async ({ cvId, id }) => {
        await fetchWithAuth(`/experiences/${cvId}/${id}`, { method: 'DELETE' });
        return id;
    }
);

export const updateExperience = createAsyncThunk(
    'experience/updateExperience',
    async ({ id, experience }) => {
        const data = await fetchWithAuth(`/experiences/${id}`, {
            method: 'PUT',
            body: JSON.stringify(experience),
        });
        return data;
    }
);