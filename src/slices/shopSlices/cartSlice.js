import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: null,
  cart: [],
  error: null
};

export const addToCart = createAsyncThunk(
  'cartSlice/addToCart',
  async (productId, quantity, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      localStorage.setItem('cart', JSON.stringify(getState().cartSlice.cart));
      return {
        name: data.name,
        thumbnailImage: data.thumbnailImage,
        price: data.price,
        countInStock: data.countInStock,
        id: data._id,
        quantity: quantity
      };
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cartSlice/removeFromCart',
  async (productId, { getState }) => {
    const cart = getState().cartSlice.cart.filter((item) => item !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }
);

export const cartAddSlice = createSlice({
  name: 'cartSlice',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload
          ? action.payload
          : 'Cannot add Product to cart. Try again later.';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cart.push(action.payload);
        state.error = null;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload
          ? action.payload
          : 'Cannot remove Product from cart. Try again later.';
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cart = action.payload;
        state.error = null;
      });
  }
});

export default cartAddSlice.reducer;
