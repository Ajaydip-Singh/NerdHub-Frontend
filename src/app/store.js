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
import eventCreateSlice from '../slices/eventSlices/eventCreateSlice';
import homePageContentGetSlice from '../slices/pageSlices/homePageContentSlices/homePageContentGetSlice';
import homePageContentUpdateSlice from '../slices/pageSlices/homePageContentSlices/homePageContentUpdateSlice';
import aboutPageContentGetSlice from '../slices/pageSlices/aboutPageContentSlices/aboutPageContentGetSlice';
import aboutPageContentUpdateSlice from '../slices/pageSlices/aboutPageContentSlices/aboutPageContentUpdateSlice';
import contactPageContentGetSlice from '../slices/pageSlices/contactPageContentSlices/contactPageContentGetSlice';
import contactPageContentUpdateSlice from '../slices/pageSlices/contactPageContentSlices/contactPageContentUpdateSlice';
import imageUploadeSliceCreater from '../slices/uploadSlices/imageUploadSlice';
import multipleImagesUploadSlice from '../slices/uploadSlices/multipleImageUploadSlice';
import productsGetSlice from '../slices/productSlices/productsGetSlice';
import productGetSlice from '../slices/productSlices/productGetSlice';
import productCreateSlice from '../slices/productSlices/productCreateSlice';
import productDeleteSlice from '../slices/productSlices/productDeleteSlice';
import productUpdateSlice from '../slices/productSlices/productUpdateSlice';
import productsCategoriesGetSlice from '../slices/productSlices/productsCategoriesGetSlice';
import productsBrandsGetSlice from '../slices/productSlices/productsBrandsGetSlice';
import cartSlice from '../slices/shopSlices/cartSlice';

export const store = configureStore({
  preloadedState: {
    userAuthentication: {
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null
    },
    cartSlice: {
      cart: localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
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
    eventUpdateSlice: eventUpdateSlice,
    eventCreateSlice: eventCreateSlice,
    homePageContentGetSlice: homePageContentGetSlice,
    homePageContentUpdateSlice: homePageContentUpdateSlice,
    aboutPageContentGetSlice: aboutPageContentGetSlice,
    aboutPageContentUpdateSlice: aboutPageContentUpdateSlice,
    contactPageContentGetSlice: contactPageContentGetSlice,
    contactPageContentUpdateSlice: contactPageContentUpdateSlice,
    imageUploadSliceA: imageUploadeSliceCreater('imageUploadSliceA'),
    imageUploadSliceB: imageUploadeSliceCreater('imageUploadSliceB'),
    imageUploadSliceC: imageUploadeSliceCreater('imageUploadSliceC'),
    imageUploadSliceD: imageUploadeSliceCreater('imageUploadSliceD'),
    multipleImagesUploadSlice: multipleImagesUploadSlice,
    productsGetSlice: productsGetSlice,
    productGetSlice: productGetSlice,
    productCreateSlice: productCreateSlice,
    productDeleteSlice: productDeleteSlice,
    productUpdateSlice: productUpdateSlice,
    productsCategoriesGetSlice: productsCategoriesGetSlice,
    productsBrandsGetSlice: productsBrandsGetSlice,
    cartSlice: cartSlice
  }
});
