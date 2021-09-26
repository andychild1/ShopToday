import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import checkoutReducer from '../features/checkout/checkoutSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    cart: cartReducer,
    checkout: checkoutReducer
  },
});
