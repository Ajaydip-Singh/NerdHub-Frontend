import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

const initialState = {
  status: 'idle',
  file: null,
  error: null
};

export const uploadImage = createAsyncThunk(
  'imageUpload/uploadImage',
  async (formData, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await Axios.post('/api/upload/image', formData, {
        headers: {
          'Content-Type': 'multimedia/form-data',
          Authorization: `Bearer ${user.token}`
        }
      });
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    resetUploadImage: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.status = 'loading';
        state.file = null;
        state.error = null;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = 'idle';
        state.file = null;
        state.error = action.payload ? action.payload : 'File Upload Failed';
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = 'idle';
        state.file = action.payload;
        state.error = null;
      });
  }
});

export const { resetUploadImage } = imageUploadSlice.actions;

export default imageUploadSlice.reducer;
