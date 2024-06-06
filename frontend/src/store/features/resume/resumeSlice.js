import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const createCv = createAsyncThunk(
    'cv/cvCreate',
    async ({ title }, thunkAPI) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch('http://127.0.0.1:8000/cvs/first', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title })
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.detail);
        }
    }
);

export const fetchCv = createAsyncThunk(
    'resume/cvRetrieve',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('accessToken')
            const response = await fetch('http://127.0.0.1:8000/cvs', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }

    }
)

export const fetchCVById = createAsyncThunk(
    'resume/fetchCVById',
    async (cvId) => {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`http://127.0.0.1:8000/cvs/${cvId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log(data);
        return data;
    }
);

export const deleteCv = createAsyncThunk(
    'resume/cvDelete',
    async ({ id }, thunkAPI) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`http://127.0.0.1:8000/cvs/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            const data = await response.json()
            return id
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.detail)
        }

    }
)

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
                state.cv = state.cv.filter(cv => cv.id !== action.payload.id);
            })
            .addCase(fetchCVById.fulfilled, (state, action) => {
                state.cv = action.payload
            })
    }
})


export default resumeSlice.reducer;