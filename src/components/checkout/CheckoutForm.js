import { selectShippingCountries, selectShippingSubdivisions, selectShippingCountry, selectShippingSubdivision,
    selectShippingOptions, selectShippingOption, } from '../../features/checkout/checkoutSlice';
import { useSelector, useDispatch } from 'react-redux';
import  { shipping_country, shipping_subdivision, shipping_option, shipping_data } from '../../features/checkout/checkoutSlice';
import { Link } from 'react-router-dom';
import './CheckoutForm.css';
import { useForm } from 'react-hook-form';
import { InputLabel, Input, Select, MenuItem, Button, Typography } from '@material-ui/core';

const CheckoutForm = ({ nextStep }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const shippingCountries = useSelector(selectShippingCountries);
    const shippingSubdivisions = useSelector(selectShippingSubdivisions);
    const shippingOptions = useSelector(selectShippingOptions);
    const shippingOption = useSelector(selectShippingOption);
    const shippingCountry = useSelector(selectShippingCountry);
    const shippingSubdivision = useSelector(selectShippingSubdivision);


    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name}));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name}));
    const options = shippingOptions.map(option => ({ id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})`}));

    const next = (data) => {
        dispatch(shipping_data(data));
        nextStep();
    };

    return(
        <>
        <form onSubmit={handleSubmit((data) => next(data))}>
            <div className="shipping-address">
            <Typography style={{ background: 'rgb(148, 241, 210)' }} variant="h6" gutterBottom>Shipping Address</Typography>
                <Input {...register("firstName", {required: true})} placeholder="First Name" fullWidth />
                <Input {...register("lastName", {required: true})} placeholder="Last Name" />
                <Input {...register("email", {required: true})} placeholder="Email" />
                <Typography style={{ background: 'rgb(148, 241, 210)' }} variant="h6" gutterBottom>Shipping Details</Typography>
                <Input {...register("shippingName", {required: true})} placeholder="Shipping Name" />
                <Input {...register("shippingStreet", {required: true})} placeholder="Shipping Street" />
                <Input {...register("city", {required: true})} placeholder="City" />
                <Input {...register("Zip", {required: true})} placeholder="ZIP / Postal Code" />
                <div className="select-fields">
                    <InputLabel>Shipping Country</InputLabel>
                    <Select required {...register('shippingCountry')} value={shippingCountry} fullWidth onChange={(e) => dispatch(shipping_country(e.target.value))}>
                    {countries.map(country => <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>)}
                    </Select>
                    <InputLabel>Shipping Subdivision</InputLabel>
                    <Select required {...register('shippingSubdivision')} value={shippingSubdivision} onChange={(e) => dispatch(shipping_subdivision(e.target.value))} fullWidth>
                    {subdivisions.map(subdivision => <MenuItem  key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>)}
                    </Select>
                    <InputLabel>Shipping Options</InputLabel>
                    <Select required {...register('shippingOption')} value={shippingOption} fullWidth onChange={(e) => dispatch(shipping_option(e.target.value))}>
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
        </>
    );
};

export default CheckoutForm;