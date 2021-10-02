import { selectShippingCountry, selectShippingCountries, selectShippingSubdivisions, selectShippingSubdivision, 
    selectShippingOptions, selectShippingOption, } from '../../features/checkout/checkoutSlice';
import { useSelector, useDispatch } from 'react-redux';
import  { shipping_country, shipping_subdivision, shipping_option } from '../../features/checkout/checkoutSlice';
import { fetchShippingOptions, fetchSubdivisions } from '../../features/products/commerce';
import { Link } from 'react-router-dom';
import './CheckoutForm.css';
import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { InputLabel, Select, MenuItem, Button, Typography } from '@material-ui/core';
import InputForm from './InputForm';
const CheckoutForm = ({ token, next }) => {
    const dispatch = useDispatch();
    const methods = useForm();

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
    }, [dispatch, shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision) {
            dispatch(fetchShippingOptions({ tokenId: token.id, country: shippingCountry, region: shippingSubdivision }));
        }
    }, [dispatch, token.id, shippingSubdivision, shippingCountry]);


    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name}));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name}));
    const options = shippingOptions.map(option => ({ id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})`}));

    return(
        <>
        <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
            <div className="shipping-address">
            <Typography style={{ background: 'rgb(148, 241, 210)' }} variant="h6" gutterBottom>Shipping Address</Typography>
                <InputForm name="firstName" label="First Name" />
                <InputForm name="lastName" label="Last Name" />
                <InputForm name="email" label="Email" />
                <Typography style={{ background: 'rgb(148, 241, 210)' }} variant="h6" gutterBottom>Shipping Details</Typography>
                <InputForm name="shippingName" label="Shipping Name" />
                <InputForm name="shippingStreet" label="Shipping Street" value=""/>
                <InputForm name="city" label="City" />
                <InputForm name="Zip" label="ZIP / Postal Code" />
                <div className="select-fields">
                    <InputLabel>Shipping Country</InputLabel>
                    <Select required value={shippingCountry} fullWidth onChange={(e) => dispatch(shipping_country(e.target.value))}>
                    {countries.map(country => <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>)}
                    </Select>
                    <InputLabel>Shipping Subdivision</InputLabel>
                    <Select required value={shippingSubdivision} onChange={(e) => dispatch(shipping_subdivision(e.target.value))} fullWidth>
                    {subdivisions.map(subdivision => <MenuItem  key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>)}
                    </Select>
                    <InputLabel>Shipping Options</InputLabel>
                    <Select required value={shippingOption} fullWidth onChange={(e) => dispatch(shipping_option(e.target.value))}>
                    {options.map(option => <MenuItem  key={option.id} value={option.id}>{option.label}</MenuItem>)}
                    </Select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link to="/cart" style={{textDecoration: 'none'}}>
                    <Button variant="contained" style={{marginBottom: '20px', background: 'rgb(177, 207, 197)'}}>Back to Cart</Button>
                </Link>
                </div>
                <Button type="submit" variant="contained" style={{background: 'rgba(7, 91, 70, 0.945)', color: 'lightgrey'}} >Confirm order</Button> 
                </div>
        </form>
        </FormProvider>
        </>
    );
};

export default CheckoutForm;