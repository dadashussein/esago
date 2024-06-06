import { createAsyncThunk } from "@reduxjs/toolkit";

export const postExperience = createAsyncThunk(
    'experience/addExperience',
    async ({ experience }, thunkAPI) => {
        try {
            const cvId = localStorage.getItem('cvId');
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`http://127.0.0.1:8000/experiences/${cvId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(experience),
            });
            const data = await response.json();
            return data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.detail);
        }
    }
);

export const fetchExperience = createAsyncThunk(
    'experience/fetchExperience',
    async ({ cvId },thunkAPI) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`http://127.0.0.1:8000/experiences/${cvId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            return data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.detail);
        }
    }
);

export const deleteExperience = createAsyncThunk(
    'experience/deleteExperience',
    async ({ id }) => {
        const cvId = localStorage.getItem('cvId');
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`http://127.0.0.1:8000/experiences/${cvId}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return id;
    }
);

export const updateExperience = createAsyncThunk(
    'experience/updateExperience',
    async ({ token, id, experience }) => {
        const response = await fetch(`http://127.0.0.1:8000/experiences/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(experience),
        });
        const data = await response.json();
        return data;
    }
);