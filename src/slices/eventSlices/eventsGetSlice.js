import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  events: [],
  error: null
};

export const getEvents = createAsyncThunk(
  'eventsGet/getEvents',
  async ({ category = '' }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/events?category=${category}`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const eventsGetSlice = createSlice({
  name: 'eventsGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.status = 'loading';
        state.events = [];
        state.error = null;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.status = 'idle';
        state.events = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get Events. Try again later.';
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.status = 'idle';
        state.events = action.payload;
        state.error = null;
      });
  }
});

export default eventsGetSlice.reducer;
