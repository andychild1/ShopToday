import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from '../../features/checkout/checkoutSlice';
import { checkoutProcess, fetchShippingCountries } from '../../features/products/commerce';
import { shipping_data, selectActiveStep, selectIncomingOrder, setActive_step, setBack_step } from '../../features/checkout/checkoutSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Check from '../../resources/pngegg.png';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Button } from '@material-ui/core';
import CheckoutForm from './CheckoutForm';
import PaymentForm from './PaymentForm';
import './Checkout.css';

const Checkout = ({cart}) => {

    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const order = useSelector(selectIncomingOrder);
    const activeStep = useSelector(selectActiveStep);
//Convertire in redux reducer!!!
//Api call per ottenere token
    const items = cart.line_items ? cart.line_items : [];
    
    useEffect(() => {
        if (items.length) {
            dispatch(checkoutProcess({ cartId: cart.id, type: { type: 'cart' }}));
        }
    }, [cart.id, dispatch, items.length]);

    useEffect(() => {
        if (token.id) {
            dispatch(fetchShippingCountries(token.id));
        }
    }, [token.id, dispatch]);

    const nextStep = () => {
        dispatch(setActive_step(1));
    };
    const backStep = () => {
        dispatch(setBack_step(1));
    };

    const next = (data) => {
        dispatch(shipping_data(data));
        nextStep();
    };
 
    const steps = ['Shipping Address', 'Payment Details'];

    let Confirmation = () => order.customer ? (
        <div style={{ marginTop: '150px' , display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
            <h3>Thank You, {order.customer.firstname} {order.customer.lastname}</h3>
            <h4>Order Confirmed</h4>
            <p>Order ref: {order.customer_reference}</p>
            <div style={{ width: '100%', height: '200px'}}>
                <img style={{ width: '200px', height: '200px' }} src={Check} alt="confirmation symbol"></img>
            </div>
            <Button component={Link} to="/" >Back To Shopping</Button>
        </div>
    ) :
    (
        <div>
            <CircularProgress />
        </div>
    );

    const Form = () => activeStep === 0
    ? <CheckoutForm token={token} cart={cart} next={next}/>
    : <PaymentForm token={token} back={backStep} nextStep={nextStep}/>

    return(
        <>
        <div  style={{ marginTop: '120px' }}/>
        <main >
            <Paper style={{ width: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                <Typography style={{background: 'aquamarine', textTransform: 'uppercase', color: 'rgba(7, 91, 70, 0.945)'}} variant="h4" align="center">Checkout</Typography>
                <Stepper style={{background: 'aquamarine'}} activeStep={activeStep}>
                    {steps.map(step => (
                    <Step key={step}>
                        <StepLabel >{step}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : token && <Form />}
            </Paper>
        </main>
        </>
    );
};

export default Checkout;