import { selectFirstName, selectLastName, selectEmail, selectShippingName, selectShippingStreet, selectShippingCity, selectShippingStateProvince, 
    selectShippingPostalZipCode, selectShippingCountry, selectShippingCountries, 
    selectShippingSubdivisions, selectShippingSubdivision, selectShippingOptions, selectShippingOption } from '../../features/checkout/checkoutSlice';
import { useSelector, useDispatch } from 'react-redux';
import  { first_Name, last_name, _email, shipping_name, shipping_street, shipping_city, shipping_country, shipping_stateProvince,
    shipping_postalZipCode, shipping_subdivision, shipping_option, shipping_data
        } from '../../features/checkout/checkoutSlice';
import { fetchShippingOptions, fetchSubdivisions } from '../../features/products/commerce';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';

const CheckoutForm = ({ token }) => {
    const dispatch = useDispatch();
    const { register, watch, handleSubmit } = useForm();
    console.log(watch());

    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);
    const email = useSelector(selectEmail);
    const shippingName = useSelector(selectShippingName);
    const shippingStreet = useSelector(selectShippingStreet);
    const shippingCity = useSelector(selectShippingCity);
    const shippingStateProvince = useSelector(selectShippingStateProvince);
    const shippingPostalZipCode = useSelector(selectShippingPostalZipCode);
    const shippingCountry = useSelector(selectShippingCountry);
    const shippingCountries = useSelector(selectShippingCountries);
    const shippingSubdivisions = useSelector(selectShippingSubdivisions);
    const shippingSubdivision = useSelector(selectShippingSubdivision);
    const shippingOptions = useSelector(selectShippingOptions);
    const shippingOption = useSelector(selectShippingOption);

    useEffect(() => {
        if (shippingCountry) {
            dispatch(fetchSubdivisions(shippingCountry));
        }
    }, [shippingCountry, dispatch]);

    useEffect(() => {
        if (shippingSubdivision) {
            dispatch(fetchShippingOptions({ tokenId: token.id, country: shippingCountry, region: shippingSubdivision }));
        }
    }, [shippingSubdivision, token.id, shippingCountry, dispatch]);

    const next = (data) => {
        dispatch(shipping_data(data));
    };
    
    const handleShippingSubdivision = (event) => {
        dispatch(shipping_subdivision(event.target.value));
    };
    const handleShippingCountry = (event) => {
        dispatch(shipping_country(event.target.value));
    };
    const handleShippingOption = (event) => {
        dispatch(shipping_option(event.target.value));
    };

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name}));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name}));
    const options = shippingOptions.map(option => ({ id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})`}));



    return(
        <form onSubmit={handleSubmit((data) => next(data))}>
            <h4 className="checkout__subheading">Customer information</h4>
                <input {...register('firstName')} placeholder='First Name' />
                <input {...register('lastName')} placeholder='Last Name' />
                <input {...register('email')} placeholder='Email' />
                <h4 className="checkout__subheading">Shipping details</h4>
                <input {...register('shippingName')} placeholder='Shippping Name' />
                <input {...register('shippingStreet')} placeholder='Shipping Street' />
                <input {...register('city')} placeholder='City' />
                <input {...register('Zip')} placeholder='ZIP / Postal Code' />
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Country</InputLabel>
                    <Select {...register('shippingCountry')} onChange={handleShippingCountry} fullWidth>
                    {countries.map(country => <MenuItem  key={country.id} value={country.id}>{country.label}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Subdivision</InputLabel>
                    <Select {...register('shippingSubdivision')} onChange={handleShippingSubdivision} fullWidth>
                    {subdivisions.map(subdivision => <MenuItem  key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Options</InputLabel>
                    <Select {...register('shippingOption')} fullWidth onChange={handleShippingOption}>
                    {options.map(option => <MenuItem  key={option.id} value={option.id}>{option.label}</MenuItem>)}
                    </Select>
                </Grid>
            
                <Link to="/cart">
                    <button>Back to Cart</button>
                </Link>
                <button type="submit" className="checkout__btn-confirm">Confirm order</button> 
        </form>
    );
};

export default CheckoutForm;