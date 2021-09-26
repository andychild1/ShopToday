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
    reducers: {},
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
export const selectShippingOptions = state => state.checkout.shippingOptions;
export const selectShippingOption = state => state.checkout.shippingOption;
export default checkoutReducer.reducer;
