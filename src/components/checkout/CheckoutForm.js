import { selectFirstName, selectLastName, selectEmail, selectShippingName, selectShippingStreet, selectShippingCity, selectShippingStateProvince, 
    selectShippingPostalZipCode, selectShippingCountry, selectCardNum, selectExpMonth, selectExpYear, selectCcv, selectBillingPostalZipCode, selectShippingCountries, 
    selectShippingSubdivisions, selectShippingSubdivision, selectShippingOptions, selectShippingOption } from '../../features/checkout/checkoutSlice';
import { useSelector, useDispatch } from 'react-redux';
import  { first_Name, last_name, _email, shipping_name, shipping_street, shipping_city, shipping_country, shipping_stateProvince,
    shipping_postalZipCode, card_num, exp_month, exp_year, ccv_change, shipping_subdivision, shipping_option, shipping_data
        } from '../../features/checkout/checkoutSlice';
import { fetchShippingOptions, fetchSubdivisions } from '../../features/products/commerce';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const CheckoutForm = ({ cart, token }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);
    const email = useSelector(selectEmail);
    const shippingName = useSelector(selectShippingName);
    const shippingStreet = useSelector(selectShippingStreet);
    const shippingCity = useSelector(selectShippingCity);
    const shippingStateProvince = useSelector(selectShippingStateProvince);
    const shippingPostalZipCode = useSelector(selectShippingPostalZipCode);
    const shippingCountry = useSelector(selectShippingCountry);
    const cardNum = useSelector(selectCardNum);
    const expMonth = useSelector(selectExpMonth);
    const expYear = useSelector(selectExpYear);
    const ccv = useSelector(selectCcv);
    const billingPostalZipcode = useSelector(selectBillingPostalZipCode);
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
    }

    const handleFirstName = (event) => {
        dispatch(first_Name(event.target.value));
    };
    const handleLastName = (event) => {
        dispatch(last_name(event.target.value));
    };
    const handleEmail = (event) => {
        dispatch(_email(event.target.value));
    };
    const handleShippingName = (event) => {
        dispatch(shipping_name(event.target.value));
    };
    const handleShippingStreet = (event) => {
        dispatch(shipping_street(event.target.value));
    };
    const handleShippingCity = (event) => {
        dispatch(shipping_city(event.target.value));
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
    const handleShippingPostalZipCode = (event) => {
        dispatch(shipping_postalZipCode(event.target.value));
    };
    const handleCardNum = (event) => {
        dispatch(card_num(event.target.value));
    };
    const handleExpMonth = (event) => {
        dispatch(exp_month(event.target.value));
    };
    const handleExpYear = (event) => {
        dispatch(exp_year(event.target.value));
    };
    const handleCcv = (event) => {
        dispatch(ccv_change(event.target.value));
    };

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name}));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name}));
    const options = shippingOptions.map(option => ({ id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})`}));

    const sanitizedLineItems = (lineItems) => {
        return lineItems.reduce((data, lineItem) => {
            const item = data;
            let variantData = null;
            if (lineItem.selected_options.length) {
              variantData = {
                [lineItem.selected_options[0].group_id]: lineItem.selected_options[0].option_id,
              };
            }
            item[lineItem.id] = {
              quantity: lineItem.quantity,
              variants: variantData,
            };
          return item;
          }, {});
    };

   


    return(
        <form onSubmit={handleSubmit((data) => )}>
            <h4 className="checkout__subheading">Customer information</h4>

                <label className="checkout__label" htmlFor="firstName">First name</label>
                <input className="checkout__input" value={firstName} onChange={handleFirstName} type="text" name="firstName" placeholder="Enter your first name" required />

                <label className="checkout__label" htmlFor="lastName">Last name</label>
                <input className="checkout__input" onChange={handleLastName} type="text" value={lastName}name="lastName" placeholder="Enter your last name" required />

                <label className="checkout__label" htmlFor="email">Email</label>
                <input className="checkout__input" onChange={handleEmail} type="text" value={email} name="email" placeholder="Enter your email" required />

                <h4 className="checkout__subheading">Shipping details</h4>

                <label className="checkout__label" htmlFor="shippingName">Full name</label>
                <input className="checkout__input" onChange={handleShippingName} type="text" value={shippingName} name="shippingName" placeholder="Enter your shipping full name" required />

                <label className="checkout__label" htmlFor="shippingStreet">Street address</label>
                <input className="checkout__input" onChange={handleShippingStreet} type="text" value={shippingStreet} name="shippingStreet" placeholder="Enter your street address" required />

                <label className="checkout__label" htmlFor="shippingCity">City</label>
                <input className="checkout__input" onChange={handleShippingCity} type="text" value={shippingCity} name="shippingCity" placeholder="Enter your city" required />
                
                <label>Shipping Country</label>
                <select value={shippingCountry} onChange={handleShippingCountry} >
                {countries.map(country => <option  key={country.id} value={country.id}>{country.label}</option>)}
                </select>
                
                <label>Shipping Subdivision</label>
                <select value={shippingSubdivision} onChange={handleShippingSubdivision}>
                {subdivisions.map(subdivision => <option  key={subdivision.id} value={subdivision.id}>{subdivision.label}</option>)}
                </select>
                
                <label>Shipping Options</label>
                <select value={shippingOption} onChange={handleShippingOption}>
                    {options.map(option => <option  key={option.id} value={option.id}>{option.label}</option>)}
                </select>
                
                <label className="checkout__label" htmlFor="shippingPostalZipCode">Postal/Zip code</label>
                <input className="checkout__input" onChange={handleShippingPostalZipCode} type="text" value={shippingPostalZipCode} name="shippingPostalZipCode" placeholder="Enter your postal/zip code" required />

                <h4 className="checkout__subheading">Payment information</h4>

                <label className="checkout__label" htmlFor="cardNum">Credit card number</label>
                <input className="checkout__input" onChange={handleCardNum} type="text" name="cardNum" value={cardNum} placeholder="Enter your card number" />

                <label className="checkout__label" htmlFor="expMonth">Expiry month</label>
                <input className="checkout__input" onChange={handleExpMonth} type="text" name="expMonth" value={expMonth} placeholder="Card expiry month" />

                <label className="checkout__label" htmlFor="expYear">Expiry year</label>
                <input className="checkout__input" onChange={handleExpYear} type="text" name="expYear" value={expYear} placeholder="Card expiry year" />

                <label className="checkout__label" htmlFor="ccv">CCV</label>
                <input className="checkout__input" onChange={handleCcv} type="text" name="ccv" value={ccv} placeholder="CCV (3 digits)" />
            
                <Link to="/cart">
                    <button>Back to Cart</button>
                </Link>
                <button type="submit" className="checkout__btn-confirm">Confirm order</button> 
        </form>
    );
};

export default CheckoutForm;