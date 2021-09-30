import Commerce from '@chec/commerce.js';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const commerce = new Commerce(process.env.REACT_APP_CHECK_PUBLIC_KEY, true);


export const loadProducts = createAsyncThunk('products/loadProduct',
async () => {
    const data = await commerce.products.list();
    return data;
}
);

export const loadCart = createAsyncThunk('products/loadCart',
async () => {
    const data = await commerce.cart.retrieve();
    return data;
}
);

export const addToCart = createAsyncThunk('cart/addToCart', 
async (data) => {
    const { productsId, quantity } = data;
    const response = await commerce.cart.add(productsId, quantity);
    return response;
});

export const updateCart = createAsyncThunk('cart/updateCart', 
async (data) => {
        const { productId, quantity } = data;
        const response = await commerce.cart.update(productId, { quantity });
        return response;
    
});


export const removeCartItem = createAsyncThunk('cart/removeFromCart', 
async (productId) => {
    const response = await commerce.cart.remove(productId);
    return response;
});

export const emptyCart = createAsyncThunk('cart/emptyCart', 
async () => {
    const response = await commerce.cart.empty();
    return response;
});

export const checkoutProcess = createAsyncThunk('checkout/generateToken',
async (data) => {
    const { cartId, type} = data;
    const response = await commerce.checkout.generateToken(cartId, type);
    return response;
});

export const fetchShippingCountries = createAsyncThunk('checkout/shippingCountries',
async (checkoutTokenId) => {
    const response = await commerce.services.localeListShippingCountries(checkoutTokenId);
    return response.countries;
});

export const fetchSubdivisions = createAsyncThunk('checkout/subdivisions',
async (countryCode) => {
    const response = await commerce.services.localeListSubdivisions(countryCode);
    return response.subdivisions;
});

export const fetchShippingOptions = createAsyncThunk('checkout/Options',
async (data) => {
    const { tokenId, country, region = null } = data;
    const response = await commerce.checkout.getShippingOptions(tokenId, { country, region });
    return response;
});

export const handleCaptureCheckout = createAsyncThunk('checkout/captureCheckout',
async (data) => {
    const { tokenId, newOrder } = data;
    const response = await commerce.checkout.capture(tokenId, newOrder);
    return response;
});

export const refreshCart = createAsyncThunk('cart/refreshCart',
async () => {
    const response = await commerce.cart.refresh();
    return response;
});
