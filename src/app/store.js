import { configureStore } from '@reduxjs/toolkit';
import userAuthentication from '../slices/userSlices/userAuthenticationSlice';
import userRegister from '../slices/userSlices/userRegisterSlice';
import userConfirmation from '../slices/userSlices/userConfirmationSlice';
import userDetails from '../slices/userSlices/userDetailsSlice';
import userUpdateSlice from '../slices/userSlices/userUpdateSlice';
import eventsGetSlice from '../slices/eventSlices/eventsGetSlice';
import eventsCategoriesGetSlice from '../slices/eventSlices/eventsCategoriesGetSlice';
import eventsVenuesGetSlice from '../slices/eventSlices/eventsVenuesGetSlice';
import eventDeleteSlice from '../slices/eventSlices/eventDeleteSlice';
import eventGetSlice from '../slices/eventSlices/eventGetSlice';
import eventUpdateSlice from '../slices/eventSlices/eventUpdateSlice';

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
    userRegister: userRegister,
    userConfirmation: userConfirmation,
    userDetails: userDetails,
    userUpdateSlice: userUpdateSlice,
    eventsGetSlice: eventsGetSlice,
    eventsCategoriesGetSlice: eventsCategoriesGetSlice,
    eventsVenuesGetSlice: eventsVenuesGetSlice,
    eventDeleteSlice: eventDeleteSlice,
    eventGetSlice: eventGetSlice,
    eventUpdateSlice: eventUpdateSlice
  }
});
