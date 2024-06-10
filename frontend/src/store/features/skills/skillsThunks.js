import { createAsyncThunk } from "@reduxjs/toolkit";

export const postSkills = createAsyncThunk(
    'skills/addSkill',
    async ({ skill, cvId }, thunkAPI) => {
        console.log(skill);
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`http://127.0.0.1:8000/skills/${cvId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(skill)
            })
            const data = await response.json()
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.detail)
        }
    }
)