import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/api";
import {
  getTextSizeFromLocalStorage,
  saveTextSizeToLocalStorage,
} from "@/utils/localStorageUtils";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const postInfo = createAsyncThunk(
  "personal/postInfo",
  async ({ info, cvId }, thunkAPI) => {
    try {
      await delay(500);
      const response = await axiosInstance.put("/cvs", { ...info, id: cvId });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Something went wrong");
    }
  },
);

export const fetchInfo = createAsyncThunk(
  "personal/fetchInfo",
  async (cvId) => {
    try {
      const response = await axiosInstance.get(`/cvs/${cvId}`);
      return response.data;
    } catch (err) {
      return err.message;
    }
  },
);

export const patchPhoto = createAsyncThunk(
  "personal/patchPhoto",
  async ({ cvId, file }, thunkAPI) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await delay(500);
      const response = await axiosInstance.patch(`/cvs/${cvId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Something went wrong");
    }
  },
);

export const deletePhoto = createAsyncThunk(
  "personal/deletePhoto",
  async (cvId, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/cvs/${cvId}/deletepicture`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Something went wrong");
    }
  },
);

const initialState = {
  status: "idle",
  avatar_status: "idle",
  error: null,
  personal: {
    title: "",
    first_name: "",
    last_name: "",
    job_title: "",
    address: "",
    phone_number: "",
    email: "",
    bio: "",
    template_id: 1,
  },
  text_size: getTextSizeFromLocalStorage(),
};

const personalSlice = createSlice({
  name: "personal",
  initialState,
  reducers: {
    setPersonalField: (state, action) => {
      const { field, value } = action.payload;
      state.personal[field] = value;
      state.status = "idle";
    },
    setTextSize: (state, action) => {
      state.text_size = action.payload;
      saveTextSizeToLocalStorage(state.text_size);
    },
    increaseTextSize: (state) => {
      if (state.text_size < 20) {
        state.text_size += 1;
        saveTextSizeToLocalStorage(state.text_size);
      }
    },
    decreaseTextSize: (state) => {
      if (state.text_size > 12) {
        state.text_size -= 1;
        saveTextSizeToLocalStorage(state.text_size);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.personal = action.payload;
      })
      .addCase(fetchInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(postInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.personal = { ...state.personal, ...action.payload };
      })
      .addCase(postInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(patchPhoto.fulfilled, (state, action) => {
        state.personal = { ...state.personal, ...action.payload };
        state.avatar_status = "succeeded";
      })
      .addCase(patchPhoto.pending, (state) => {
        state.avatar_status = "loading";
      })
      .addCase(patchPhoto.rejected, (state, action) => {
        state.error = action.payload;
        state.avatar_status = "failed";
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.personal = { ...state.personal, ...action.payload };
        state.avatar_status = "succeeded";
      });
  },
});

export const {
  setPersonalField,
  setTextSize,
  increaseTextSize,
  decreaseTextSize,
} = personalSlice.actions;

export default personalSlice.reducer;
