import { createSlice } from '@reduxjs/toolkit';
import { loadProducts } from './commerce';

const initialState = {
    category: {},
    isLoadingItems: false,
    rejectedItems: false
};

const productsReducer = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: {
        [loadProducts.pending]: (state, action) => {
            state.isLoadingItems = true;
            state.rejectedItems = false;
        },
        [loadProducts.fulfilled]: (state, action) => {
            state.isLoadingItems = false;
            state.category = action.payload;
            state.rejectedItems = false;
        },
        [loadProducts.rejected]: (state, action) => {
            state.isLoadingItems = false;
            state.rejectedItems = true;
        },
    },
});

export const selectProducts = state => state.products.category;

export const isLoadingProducts = state => state.products.isLoadingItems;

export const isRejectedProducts = state => state.rejectedItems;

export default productsReducer.reducer;