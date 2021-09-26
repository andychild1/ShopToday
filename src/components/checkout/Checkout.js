import { useSelector, useDispatch } from 'react-redux';
import { selectToken, selectFirstName, selectLastName, selectEmail, selectShippingName, selectShippingStreet, selectShippingCity, selectShippingStateProvince, 
    selectShippingPostalZipCode, selectShippingCountry, selectCardNum, selectExpMonth, selectExpYear, selectCcv, selectBillingPostalZipCode, selectShippingCountries, 
    selectShippingSubdivisions, selectShippingOptions, selectShippingOption } from '../../features/checkout/checkoutSlice';
import { checkoutProcess } from '../../features/products/commerce';
import { useEffect } from 'react';

const Checkout = ({cart}) => {

    const dispatch = useDispatch();
    const token = useSelector(selectToken);
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
    const shippingOptions = useSelector(selectShippingOptions);
    const shippingOption = useSelector(selectShippingOption);
//Convertire in redux reducer!!!
//Api call per ottenere token
    
    
    useEffect(() => {
        if (cart.line_items.length) {
            dispatch(checkoutProcess({ cartId: cart.id, type: { type: 'cart '}}));
        }
    }, [cart.id, dispatch, cart.line_items]);

    return(
        <form>
            <h4 className="checkout__subheading">Customer information</h4>

                <label className="checkout__label" htmlFor="firstName">First name</label>
                <input className="checkout__input" type="text" value={firstName} name="firstName" placeholder="Enter your first name" required />

                <label className="checkout__label" htmlFor="lastName">Last name</label>
                <input className="checkout__input" type="text" value={lastName}name="lastName" placeholder="Enter your last name" required />

                <label className="checkout__label" htmlFor="email">Email</label>
                <input className="checkout__input" type="text" value={email} name="email" placeholder="Enter your email" required />

                <h4 className="checkout__subheading">Shipping details</h4>

                <label className="checkout__label" htmlFor="shippingName">Full name</label>
                <input className="checkout__input" type="text" value={shippingName} name="shippingName" placeholder="Enter your shipping full name" required />

                <label className="checkout__label" htmlFor="shippingStreet">Street address</label>
                <input className="checkout__input" type="text" value={shippingStreet} name="shippingStreet" placeholder="Enter your street address" required />

                <label className="checkout__label" htmlFor="shippingCity">City</label>
                <input className="checkout__input" type="text" value={shippingCity} name="shippingCity" placeholder="Enter your city" required />

                <label className="checkout__label" htmlFor="shippingPostalZipCode">Postal/Zip code</label>
                <input className="checkout__input" type="text" value={shippingPostalZipCode} name="shippingPostalZipCode" placeholder="Enter your postal/zip code" required />

                <h4 className="checkout__subheading">Payment information</h4>

                <label className="checkout__label" htmlFor="cardNum">Credit card number</label>
                <input className="checkout__input" type="text" name="cardNum" value={cardNum} placeholder="Enter your card number" />

                <label className="checkout__label" htmlFor="expMonth">Expiry month</label>
                <input className="checkout__input" type="text" name="expMonth" value={expMonth} placeholder="Card expiry month" />

                <label className="checkout__label" htmlFor="expYear">Expiry year</label>
                <input className="checkout__input" type="text" name="expYear" value={expYear} placeholder="Card expiry year" />

                <label className="checkout__label" htmlFor="ccv">CCV</label>
                <input className="checkout__input" type="text" name="ccv" value={ccv} placeholder="CCV (3 digits)" />

                <button className="checkout__btn-confirm">Confirm order</button> 
        </form>
    );
};

export default Checkout;