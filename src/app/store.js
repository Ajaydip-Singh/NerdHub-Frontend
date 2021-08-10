import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../screens/LoginScreen/loginScreenSlice';

export const store = configureStore({
  preloadedState: {
    login: {
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null
    }
  },
  reducer: {
    login: loginReducer
  }
});
