import { createSlice } from '@reduxjs/toolkit';
import { checkoutProcess, fetchShippingCountries, fetchSubdivisions, fetchShippingOptions, handleCaptureCheckout } from '../products/commerce';

const initialState = {
      checkoutToken: {},
      shippingData: {},
      incomingOrder: {},
      activeStep: 0,
      // Shipping and fulfillment data
      shippingCountry: '',
      shippingCountries: [],
      shippingSubdivisions: [],
      shippingSubdivision: '',
      shippingOptions: [],
      shippingOption: '',
      checkoutPending: false,
      checkoutRejected: false,
      shippingCountryPending: false,
      shippingCountryRejected: false,
      subdivisionsPending: false,
      subdivisionsRejected: false,
      shippingOptionsPending: false,
      shippingOptionsRejected: false,
      captureCheckoutPending: false,
      captureCheckoutRejected: false
};

const checkoutReducer = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        //Si può omettere il return per via dell' uso di IMMER
        shipping_country: (state, action) => {
            state.shippingCountry = action.payload;
        },
        shipping_subdivision: (state, action) => {
            state.shippingSubdivision = action.payload;
        },
        shipping_option: (state, action) => {
            state.shippingOption = action.payload;
        },
        shipping_data: (state, action) => {
            state.shippingData = action.payload;
        },
        setActive_step: (state, action) =>  {
            state.activeStep += action.payload;
        },
        setBack_step: (state, action) => {
            state.activeStep -= action.payload;
        },
        reset_step: (state, action) => {
            state.activeStep = action.payload;
        },
    },
    extraReducers: {
        [checkoutProcess.pending]: (state) => {
            state.checkoutPending = true;
            state.checkoutRejected = false;
        },
        [checkoutProcess.fulfilled]: (state, action) => {
            state.checkoutPending = false;
            state.checkoutRejected = false;
            state.checkoutToken = action.payload;
        },
        [checkoutProcess.rejected]: (state) => {
            state.checkoutPending = false;
            state.checkoutRejected = true;
        },
        [fetchShippingCountries.pending]: (state) => {
            state.shippingCountryPending = true;
            state.shippingCountryRejected = false;
        },
        [fetchShippingCountries.fulfilled]: (state, action) => {
            state.shippingCountryPending = false;
            state.shippingCountryRejected = false;
            state.shippingCountries = action.payload;
        },
        [fetchShippingCountries.rejected]: (state) => {
            state.shippingCountryPending = false;
            state.shippingCountryRejected = true;
        },
        [fetchSubdivisions.pending]: (state) => {
            state.subdivisionsPending = true;
            state.subdivisionsRejected = false;
        },
        [fetchSubdivisions.fulfilled]: (state, action) => {
            state.subdivisionsPending = false;
            state.subdivisionsRejected = false;
            state.shippingSubdivisions = action.payload;
        },
        [fetchSubdivisions.rejected]: (state) => {
            state.subdivisionsPending = false;
            state.subdivisionsRejected = true;
        },
        [fetchShippingOptions.pending]: (state) => {
            state.shippingOptionsPending = true;
            state.shippingOptionsRejected = false;
        },
        [fetchShippingOptions.fulfilled]: (state, action) => {
            state.shippingOptionsPending = false;
            state.shippingOptionsRejected = false;
            state.shippingOptions = action.payload;
        },
        [fetchShippingOptions.rejected]: (state) => {
            state.shippingOptionsPending = false;
            state.shippingOptionsRejected = true;
        },
        [handleCaptureCheckout.pending]: (state) => {
            state.captureCheckoutPending = true;
            state.captureCheckoutRejected = false;
        },
        [handleCaptureCheckout.fulfilled]: (state, action) => {
            state.captureCheckoutPending = false;
            state.captureCheckoutRejected = false;
            state.incomingOrder = action.payload;
        },
        [handleCaptureCheckout.rejected]: (state) => {
            state.captureCheckoutPending = false;
            state.captureCheckoutRejected = true;
        },
    }
});

export const selectToken = state => state.checkout.checkoutToken;
export const selectActiveStep = state => state.checkout.activeStep;
export const selectShippingCountry = state => state.checkout.shippingCountry;
export const selectShippingCountries = state => state.checkout.shippingCountries;
export const selectShippingSubdivisions = state => state.checkout.shippingSubdivisions;
export const selectShippingSubdivision = state => state.checkout.shippingSubdivision;
export const selectShippingOptions = state => state.checkout.shippingOptions;
export const selectShippingOption = state => state.checkout.shippingOption;
export const selectShippingData = state => state.checkout.shippingData;
export const selectIncomingOrder = state => state.checkout.incomingOrder;
export const selectFirstName = state => state.checkout.firstName;
export const selectLastName = state => state.checkout.lastName;
export const selectEmail = state => state.checkout.email;
export const selectShippingName = state => state.checkout.shippingName;
export const selectShippingStreet = state => state.checkout.shippingStreet;
export const selectShippingCity = state => state.checkout.shippingCity;
export const selectShippingZipCode = state => state.checkout.shippingZipCode;
export const { card_num, exp_month, exp_year, ccv_change, shipping_country, shipping_subdivision, shipping_option, shipping_data,
    setActive_step, setBack_step, reset_step
      } = checkoutReducer.actions;
export default checkoutReducer.reducer;
