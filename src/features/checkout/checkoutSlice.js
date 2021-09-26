import { createSlice } from '@reduxjs/toolkit';
import { checkoutProcess } from '../products/commerce';

const initialState = {
    checkoutToken: {},
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
      shippingCountries: {},
      shippingSubdivisions: {},
      shippingOptions: [],
      shippingOption: '',
      checkoutPending: false,
      checkoutRejected: false
};

const checkoutReducer = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        first_Name: (state, action) => {
            return state.firstName[action.payload];
        },
        last_name: (state, action) => {
            return state.lastName[action.payload];
        },
        _email: (state, action) => {
            return state.email[action.payload];
        },
        shipping_name: (state, action) => {
            return state.shippingName[action.payload];
        },
        shipping_street: (state, action) => {
            return state.shippingStreet[action.payload];
        },
        shipping_city: (state, action) => {
            return state.shippingCity[action.payload];
        },
        shipping_stateProvince: (state, action) => {
            return state.shippingStateProvince[action.payload];
        },
        shipping_postalZipCode: (state, action) => {
            return state.shippingPostalZipCode[action.payload];
        },
        card_num: (state, action) => {
            return state.cardNum[action.payload];
        },
        exp_month: (state, action) => {
            return state.expMonth[action.payload];
        },
        exp_year: (state, action) => {
            return state.expYear[action.payload];
        },
        ccv_change: (state, action) => {
            return state.ccv[action.payload];
        }
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
    }
});

export const selectToken = state => state.checkout.checkoutToken;
export const selectFirstName = state => state.firstName;
export const selectLastName = state => state.lastName;
export const selectEmail = state => state.email;
export const selectShippingName = state => state.shippingName;
export const selectShippingStreet = state => state.shippingStreet;
export const selectShippingCity = state => state.shippingCity;
export const selectShippingStateProvince = state => state.shippingStateProvince;
export const selectShippingPostalZipCode = state => state.shippingPostalZipCode;
export const selectShippingCountry = state => state.shippingCountry;
export const selectCardNum = state => state.cardNum;
export const selectExpMonth = state => state.expMonth;
export const selectExpYear = state => state.expYear;
export const selectCcv = state => state.ccv;
export const selectBillingPostalZipCode = state => state.billingPostalZipCode;
export const selectShippingCountries = state => state.shippingCountries;
export const selectShippingSubdivisions = state => state.shippingSubdivisions;
export const selectShippingOptions = state => state.shippingOptions;
export const selectShippingOption = state => state.shippingOption;
export const { first_Name, last_name, _email, shipping_name, shipping_street, shipping_city, shipping_stateProvince, shipping_postalZipCode,
      card_num, exp_month, exp_year, ccv_change
      } = checkoutReducer.actions;
export default checkoutReducer.reducer;
