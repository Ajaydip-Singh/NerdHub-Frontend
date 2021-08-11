import { configureStore } from '@reduxjs/toolkit';
import userAuthentication from '../slices/userSlices/userAuthenticationSlice';
import userRegister from '../slices/userSlices/userRegisterSlice';

export const store = configureStore({
  preloadedState: {
    userAuthentication: {
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null
    }
  },
  reducer: {
    userAuthentication: userAuthentication,
    userRegister: userRegister
  }
});
