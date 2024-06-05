import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const downloadCV = createAsyncThunk(
    'resume/cvDownload',
    async (thunkAPI) => {
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

// export const updateCV = createAsyncThunk(
//     'resume/updateCV',
//     async ({ cvId, data }) => {
//         const token = localStorage.getItem('accessToken');
//         const response = await fetch(`http://127.0.0.1:8000/cvs/${cvId}`, {
//             method: 'PUT',
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data)
//         });
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const updatedData = await response.json();
//         return updatedData;
//     }
// );


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
            .addCase(downloadCV.fulfilled, (state, action) => {
                state.cv = action.payload
            })
            .addCase(deleteCv.fulfilled, (state, action) => {
                state.cv = state.cv.filter(cv => cv.id !== action.payload.id);
            });
    }
})


export default resumeSlice.reducer;