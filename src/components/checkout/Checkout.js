import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from '../../features/checkout/checkoutSlice';
import { checkoutProcess, fetchShippingCountries } from '../../features/products/commerce';
import { selectShippingData } from '../../features/checkout/checkoutSlice';
import { useEffect } from 'react';
import CheckoutForm from './CheckoutForm';
import PaymentForm from './PaymentForm';
import './Checkout.css';

const Checkout = ({cart}) => {

    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const shippingData = useSelector(selectShippingData);
//Convertire in redux reducer!!!
//Api call per ottenere token
    const items = cart.line_items ? cart.line_items : [];
    
    useEffect(() => {
        if (items.length) {
            dispatch(checkoutProcess({ cartId: cart.id, type: { type: 'cart' }}));
        }
    }, [cart.id, dispatch, cart.line_items, items.length]);

    useEffect(() => {
        dispatch(fetchShippingCountries(token.id));
    }, [token.id, dispatch]);


    return(
        <>
        {Object.entries(shippingData).length ? <PaymentForm token={token}/> : <CheckoutForm token={token} cart={cart}/>}
        </>
    );
};

export default Checkout;