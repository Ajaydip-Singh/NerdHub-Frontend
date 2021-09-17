import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  images: [],
  error: null
};

export const getImages = createAsyncThunk(
  'imagesGet/getImages',
  async (tag, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/upload/image?tag=${tag}`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const imagesGetSlice = createSlice({
  name: 'imagesGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getImages.pending, (state) => {
        state.status = 'loading';
        state.images = [];
        state.error = null;
      })
      .addCase(getImages.rejected, (state, action) => {
        state.status = 'idle';
        state.images = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get Images. Try again later.';
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.status = 'idle';
        state.images = action.payload;
        state.error = null;
      });
  }
});

export default imagesGetSlice.reducer;
