import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import fetchWithAuth from "~/utils/api";


export const createCv = createAsyncThunk(
    'cv/cvCreate',
    async ({ title }) => {
        const data = await fetchWithAuth('/cvs/first', {
            method: 'POST',
            body: JSON.stringify({ title }),
        });
        return data;
    }
);

export const fetchCv = createAsyncThunk(
    'resume/cvRetrieve',
    async () => {
        const data = await fetchWithAuth('/cvs');
        return data;
    }
);

export const fetchCVById = createAsyncThunk(
    'resume/fetchCVById',
    async (cvId) => {
        const data = await fetchWithAuth(`/cvs/${cvId}`);
        return data;
    }
);


export const deleteCv = createAsyncThunk(
    'resume/cvDelete',
    async ({ id }) => {
        await fetchWithAuth(`/cvs/${id}`, { method: 'DELETE' });
        return id;
    }
);

const initialState = {
    cv: [],
    status: 'idle'
}

const resumeSlice = createSlice({
    name: "resume",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCv.fulfilled, (state, action) => {
                state.cv = action.payload
            })
            .addCase(deleteCv.fulfilled, (state, action) => {
                state.cv = state.cv.filter(cv => cv.id !== action.payload);
            })
            .addCase(fetchCVById.fulfilled, (state, action) => {
                state.cv = action.payload
            })
    }
})


export default resumeSlice.reducer;