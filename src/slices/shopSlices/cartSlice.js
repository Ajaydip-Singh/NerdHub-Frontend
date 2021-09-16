import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { stripHtml } from '../../utils';

const initialState = {
  status: null,
  cart: [],
  error: null
};

export const addToCart = createAsyncThunk(
  'cartSlice/addToCart',
  async ({ productId, quantity }, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      const product = {
        id: data._id,
        name: stripHtml(data.cardName),
        quantity: quantity,
        countInStock: data.countInStock,
        price: data.price,
        thumbnailImage: data.thumbnailImage
      };
      return product;
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
        const addedProduct = action.payload;
        const existingProduct = state.cart.find(
          (product) => product.id === addedProduct.id
        );
        if (existingProduct) {
          state.cart = state.cart.map((product) =>
            product.id === existingProduct.id ? addedProduct : product
          );
        } else {
          state.cart = [...state.cart, addedProduct];
        }
        localStorage.setItem('cart', JSON.stringify(state.cart));
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
