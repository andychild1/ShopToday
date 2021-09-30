import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';
import { selectShippingData } from '../../features/checkout/checkoutSlice';
import { useDispatch, useSelector } from 'react-redux';
import { handleCaptureCheckout, refreshCart } from '../../features/products/commerce';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ token }) => {

    const dispatch = useDispatch();
    const shippingData = useSelector(selectShippingData);
console.log(shippingData);
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
                        payment_methid_id: paymentMethod.id
                    }
                }
            }
            dispatch(handleCaptureCheckout({ tokenId: token.id, newOrder: orderData}));
            dispatch(refreshCart());
            console.log(orderData);
        }
    }
    
    return(
        <>
        <Review token={token}/>
             <h4>Payment Method</h4>
             <Elements stripe={stripePromise}>
                 <ElementsConsumer>
                     {({ elements, stripe }) => (
                         <form onSubmit={(event) => handleSubmit(event, elements, stripe)}>
                             <CardElement />
                             <br></br><br></br>
                             <div>
                                 <button>Back</button>
                                 <button type="submit" disabled={!stripe}>Pay {token.live.subtotal.formatted_with_symbol}</button>
                             </div>
                         </form>
                     )}
                 </ElementsConsumer>
             </Elements>
        </>
    );
};
export default PaymentForm;