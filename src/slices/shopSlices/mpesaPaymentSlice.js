import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  mpesa: null,
  error: null
};

export const paymentMpesa = createAsyncThunk(
  'mpesaPayment/paymentMpesa',
  async (phoneNumber, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.post(
        `/api/orders/pay`,
        { phoneNumber },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.errorMessage);
    }
  }
);

export const mpesaPaymentSlice = createSlice({
  name: 'mpesaPayment',
  initialState,
  reducers: {
    resetPaymentMpesa: (state) => {
      state.status = 'idle';
      state.mpesa = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(paymentMpesa.pending, (state) => {
        state.status = 'loading';
        state.mpesa = null;
        state.error = null;
      })
      .addCase(paymentMpesa.rejected, (state, action) => {
        state.status = 'idle';
        state.mpesa = null;
        state.error = action.payload
          ? action.payload
          : 'Mpesa payment failed. Try again later.';
      })
      .addCase(paymentMpesa.fulfilled, (state, action) => {
        state.status = 'idle';
        state.mpesa = action.payload;
        state.error = null;
      });
  }
});

export const { resetPaymentMpesa } = mpesaPaymentSlice.actions;

export default mpesaPaymentSlice.reducer;
