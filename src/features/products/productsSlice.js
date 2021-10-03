import { createSlice } from '@reduxjs/toolkit';
import { loadCategories, loadProducts, loadCategory } from './commerce';

const initialState = {
    products: {},
    category: {},
    categories: [],
    selectedCategory: '',
    isLoadingItems: false,
    rejectedItems: false,
    isLoadingCategory: false,
    rejectedCategory: false,
    loadCategoryPending: false,
    loadCategoryRejected: false
};

const productsReducer = createSlice({
    name: 'products',
    initialState,
    reducers: {
        select_category: (state, action) => {
            state.selectedCategory = action.payload;
        },
    },
    extraReducers: {
        [loadProducts.pending]: (state, action) => {
            state.isLoadingItems = true;
            state.rejectedItems = false;
        },
        [loadProducts.fulfilled]: (state, action) => {
            state.isLoadingItems = false;
            state.products = action.payload;
            state.rejectedItems = false;
        },
        [loadProducts.rejected]: (state, action) => {
            state.isLoadingItems = false;
            state.rejectedItems = true;
        },
        [loadCategories.pending]: (state) => {
            state.isLoadingCategory = true;
            state.rejectedCategory = false;
        },
        [loadCategories.fulfilled]: (state, action) => {
            state.isLoadingCategory = false;
            state.rejectedCategory = false;
            state.categories = action.payload;
        },
        [loadCategories.rejected]: (state) => {
            state.isLoadingCategory = false;
            state.rejectedCategory = true;
        },
        [loadCategory.pending]: (state) => {
            state.loadCategoryPending = true;
            state.loadCategoryRejected = false;
        },
        [loadCategory.fulfilled]: (state, action) => {
            state.loadCategoryPending = false;
            state.loadCategoryRejected = false;
            state.category = action.payload;
        },
        [loadCategory.rejected]: (state) => {
            state.loadCategoryPending = false;
            state.loadCategoryRejected = true;
        },
    },
});

export const selectProducts = state => state.products.products;

export const isLoadingProducts = state => state.products.isLoadingItems;

export const isRejectedProducts = state => state.rejectedItems;

export const selectCategories = state => state.products.categories;

export const selectSelectedCategory = state => state.products.selectedCategory;

export const selectCategory = state => state.products.category;

export const { select_category } = productsReducer.actions;

export default productsReducer.reducer;