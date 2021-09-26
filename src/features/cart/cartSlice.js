import { createSlice } from '@reduxjs/toolkit';
import { loadCart, addToCart, updateCart, removeCartItem } from '../products/commerce';


const initialState = {
    cart : {},
    isLoadingCart: false,
    isRejectedCart: false,
    addToCartPending: false,
    addToCartRejected: false,
    updateCartPending: false,
    updateCartRejected: false,
    removeCartItemPending: false,
    removeCartItemRejected: false,
};

const cartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
       
    },
    extraReducers: {
        [loadCart.pending]: (state) => {
            state.isLoadingCart = true;
            state.isRejectedCart = false;
        },
        [loadCart.fulfilled]: (state, action) => {
            state.isLoadingCart = false;
            state.cart = action.payload;
            state.isRejectedCart = false;
        },
        [loadCart.rejected]: (state) => {
            state.isLoadingCart = false;
            state.isRejectedCart= true;
        },
        [addToCart.pending]: (state) => {
            state.addToCartPending = true;
            state.addToCartRejected = false;
        },
        [addToCart.fulfilled]: (state, action) => {
            state.addToCartPending = false;
            state.addToCartRejected = false;
            state.cart = action.payload.cart;
        },
        [addToCart.rejected]: (state) => {
            state.isLoadingCart = false;
            state.isRejectedCart = true;
        },
        [updateCart.pending]: (state) => {
            state.updateCartPending = true;
            state.updateCartRejected = false;
        },
        [updateCart.fulfilled]: (state, action) => {
            state.updateCartPending = false;
            state.updateCartRejected = false;
            state.cart = action.payload.cart;
        },
        [updateCart.rejected]: (state) => {
            state.updateCartPending = false;
            state.updateCartRejected = true;
        },
        [removeCartItem.pending]: (state) => {
            state.removeCartItemPending = true;
            state.removeCartItemRejected = false;
        },
        [removeCartItem.fulfilled]: (state, action) => {
            state.removeCartItemPending = false;
            state.removeCartItemRejected = false;
            state.cart = action.payload.cart;
        },
        [removeCartItem.rejected]: (state) => {
            state.removeCartItemPending = false;
            state.removeCartItemRejected = true;
        },
    },
});
export const selectCart = state => state.cart;
export const selectLoadingCart = state => state.cart.isLoadingCart;
export const selectRejectedCart = state => state.cart.isRejectedCart;
export const selectUpdateCart = state => state.cart.updateCartPending;

export default cartReducer.reducer;