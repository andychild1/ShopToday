import { createSlice } from '@reduxjs/toolkit';
import { checkoutProcess, fetchShippingCountries, fetchSubdivisions, fetchShippingOptions, handleCaptureCheckout } from '../products/commerce';

const initialState = {
      checkoutToken: {},
      shippingData: {},
      incomingOrder: {},
      // Customer details
      firstName: '',
      lastName: '',
      email: '',
      // Shipping details
      shippingName: '',
      shippingStreet: '',
      shippingCity: '',
      shippingStateProvince: '',
      shippingPostalZipCode: '',
      shippingCountry: '',
      // Payment details
      cardNum: '',
      expMonth: '',
      expYear: '',
      ccv: '',
      billingPostalZipcode: '',
      // Shipping and fulfillment data
      shippingCountries: [],
      shippingSubdivisions: [],
      shippingSubdivision: '',
      shippingOptions: [],
      shippingOption: '',
      orderConfirm: false,
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
        first_Name: (state, action) => {
            state.firstName = action.payload;
        },
        last_name: (state, action) => {
            state.lastName = action.payload;
        },
        _email: (state, action) => {
            state.email = action.payload;
        },
        shipping_name: (state, action) => {
            state.shippingName = action.payload;
        },
        shipping_street: (state, action) => {
            state.shippingStreet = action.payload;
        },
        shipping_city: (state, action) => {
            state.shippingCity = action.payload;
        },
        shipping_stateProvince: (state, action) => {
            state.shippingStateProvince = action.payload;
        },
        shipping_country: (state, action) => {
            state.shippingCountry = action.payload;
        },
        shipping_subdivision: (state, action) => {
            state.shippingSubdivision = action.payload;
        },
        shipping_option: (state, action) => {
            state.shippingOption = action.payload;
        },
        shipping_postalZipCode: (state, action) => {
            state.shippingPostalZipCode = action.payload;
        },
        card_num: (state, action) => {
            state.cardNum = action.payload;
        },
        exp_month: (state, action) => {
            state.expMonth = action.payload;
        },
        exp_year: (state, action) => {
            state.expYear = action.payload;
        },
        ccv_change: (state, action) => {
            state.ccv = action.payload;
        },
        shipping_data: (state, action) => {
            state.shippingData = action.payload;
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
export const selectFirstName = state => state.checkout.firstName;
export const selectLastName = state => state.checkout.lastName;
export const selectEmail = state => state.checkout.email;
export const selectShippingName = state => state.checkout.shippingName;
export const selectShippingStreet = state => state.checkout.shippingStreet;
export const selectShippingCity = state => state.checkout.shippingCity;
export const selectShippingStateProvince = state => state.checkout.shippingStateProvince;
export const selectShippingPostalZipCode = state => state.checkout.shippingPostalZipCode;
export const selectShippingCountry = state => state.checkout.shippingCountry;
export const selectCardNum = state => state.checkout.cardNum;
export const selectExpMonth = state => state.checkout.expMonth;
export const selectExpYear = state => state.checkout.expYear;
export const selectCcv = state => state.checkout.ccv;
export const selectBillingPostalZipCode = state => state.checkout.billingPostalZipCode;
export const selectShippingCountries = state => state.checkout.shippingCountries;
export const selectShippingSubdivisions = state => state.checkout.shippingSubdivisions;
export const selectShippingSubdivision = state => state.checkout.shippingSubdivision;
export const selectShippingOptions = state => state.checkout.shippingOptions;
export const selectShippingOption = state => state.checkout.shippingOption;
export const selectShippingData = state => state.checkout.shippingData;
export const selectIncomingOrder = state => state.checkout.incomingOrder;
export const { first_Name, last_name, _email, shipping_name, shipping_street, shipping_city, shipping_stateProvince, shipping_postalZipCode,
      card_num, exp_month, exp_year, ccv_change, shipping_country, shipping_subdivision, shipping_option, shipping_data, confirm_order
      } = checkoutReducer.actions;
export default checkoutReducer.reducer;
