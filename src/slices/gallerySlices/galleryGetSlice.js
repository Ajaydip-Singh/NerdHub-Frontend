import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  gallery: [],
  error: null
};

export const getGallery = createAsyncThunk(
  'galleryGet/getGallery',
  async ({ tag = '' }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/gallery?tag=${tag}`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const galleryGetSlice = createSlice({
  name: 'galleryGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGallery.pending, (state) => {
        state.status = 'loading';
        state.gallery = [];
        state.error = null;
      })
      .addCase(getGallery.rejected, (state, action) => {
        state.status = 'idle';
        state.gallery = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get Gallery. Try again later.';
      })
      .addCase(getGallery.fulfilled, (state, action) => {
        state.status = 'idle';
        state.gallery = action.payload;
        state.error = null;
      });
  }
});

export default galleryGetSlice.reducer;
