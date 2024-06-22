import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { compile } from "@fileforge/react-print";

export const compileToHtml = createAsyncThunk(
  "compileHtml/compileToHtml",
  async ({ component }, { rejectWithValue }) => {
    try {
      console.log(component);
      // const html = await compile(component);
      // console.log(html);
      // console.log('cilke');
      // const response = await axios({
      //     method: 'POST',
      //     url: 'https://api.pdfendpoint.com/v1/convert',
      //     headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: 'Bearer pdfe_live_bae617c9c642e7951d81ff4a458ebe180b5e',
      //     },
      //     data: JSON.stringify({
      //         html,
      //         sandbox: true,
      //         orientation: 'vertical',
      //         page_size: 'A4',
      //         margin_top: '2cm',
      //         margin_bottom: '2cm',
      //         margin_left: '2cm',
      //         margin_right: '2cm',
      //     }),
      // });
      // return response.data.data.url;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

const compileHtmlSlice = createSlice({
  name: "compileHtml",
  initialState: {
    loading: false,
    error: null,
    pdfUrl: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(compileToHtml.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(compileToHtml.fulfilled, (state, action) => {
        state.loading = false;
        state.pdfUrl = action.payload;
      })
      .addCase(compileToHtml.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default compileHtmlSlice.reducer;
