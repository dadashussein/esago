import axiosInstance from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createCustom = createAsyncThunk(
  "other/createCustom",
  async ({ cvId, customName }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/others/${cvId}/create?name=${customName}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error creating custom item", error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchCustom = createAsyncThunk(
  "other/fetchCustom",
  async (cvId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/others/${cvId}/all`);
      return response.data["data"];
    } catch (error) {
      console.error("Error fetching data", error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteCustom = createAsyncThunk(
  "other/deleteCustom",
  async ({ cvId, id }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/others/${cvId}/${id}`);
      return id;
    } catch (error) {
      console.error("Error deleting custom item", error);
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  custom: [],
  status: "idle",
  error: null,
};

const otherSlice = createSlice({
  name: "other",
  initialState,
  reducers: {
    addNewItems: (state) => {
      state.custom.push({
        name: "",
      });
    },
    setCustomField: (state, action) => {
      const { name } = action.payload;
      state.custom.name = name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustom.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.custom = action.payload;
      })
      .addCase(fetchCustom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createCustom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCustom.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.custom.push(action.payload);
      })
      .addCase(createCustom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteCustom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCustom.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.custom = state.custom.filter(
          (item) => item.id !== action.payload,
        );
      })
      .addCase(deleteCustom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCustomField, addNewItems } = otherSlice.actions;

export default otherSlice.reducer;
