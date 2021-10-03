import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';
import { selectShippingData } from '../../features/checkout/checkoutSlice';
import { useDispatch, useSelector } from 'react-redux';
import { handleCaptureCheckout, refreshCart } from '../../features/products/commerce';
import { Divider, Typography, Button } from '@material-ui/core';
import './PaymentForm.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ token, back, nextStep }) => {

    const dispatch = useDispatch();
    const shippingData = useSelector(selectShippingData);
    
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

        if (error) {
            console.log(error);
        } else {
            const orderData = {
                line_items: token.live.line_items,
                customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
                shipping: { 
                    name: 'Primary',
                    street: shippingData.shippingStreet, 
                    town_city: shippingData.city, 
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.Zip,
                    country: shippingData.shippingCountry
                },
                billing: { 
                    name: 'Primary',
                    street: shippingData.shippingStreet, 
                    town_city: shippingData.city, 
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.Zip,
                    country: shippingData.shippingCountry
                },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }
            dispatch(handleCaptureCheckout({ tokenId: token.id, newOrder: orderData}));
            dispatch(refreshCart());
            nextStep();
        }
    }
    
    return(
        <div className="payment-container">
        <Review token={token}/>
        <Divider />
             <Typography style={{ background: 'rgb(148, 241, 210)' }} variant="h6" gutterBottom>Payment Method</Typography>
             <Elements stripe={stripePromise}>
                 <ElementsConsumer>
                     {({ elements, stripe }) => (
                         <form onSubmit={(event) => handleSubmit(event, elements, stripe)} style={{ margin: '20px' }}>
                             <CardElement />
                             <br></br><br/>
                             <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '20px' }}>
                                 <Button onClick={back}  variant="outlined" style={{background: 'rgb(177, 207, 197)'}}>Back</Button>
                                 <Button type="submit" variant="contained" disabled={!stripe} color="secondary">Pay {token.live.subtotal.formatted_with_symbol}</Button>
                             </div>
                         </form>
                     )}
                 </ElementsConsumer>
             </Elements>
        </div>
    );
};
export default PaymentForm;