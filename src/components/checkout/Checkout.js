import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from '../../features/checkout/checkoutSlice';
import { checkoutProcess, fetchShippingCountries, fetchShippingOptions, fetchSubdivisions, } from '../../features/products/commerce';
import { selectActiveStep, selectIncomingOrder, selectShippingCountry, selectShippingSubdivision, setActive_step, setBack_step, reset_step } from '../../features/checkout/checkoutSlice';
import { useEffect } from 'react';
import { Stepper, Step, StepLabel, Typography } from '@material-ui/core';
import Form from './Form';
import Confirmation from './Confirmation';
import './Checkout.css';

const Checkout = ({cart}) => {

    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const order = useSelector(selectIncomingOrder);
    const activeStep = useSelector(selectActiveStep);
    const shippingCountry = useSelector(selectShippingCountry);
    const shippingSubdivision = useSelector(selectShippingSubdivision);


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
    }, [dispatch, token.id]);

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

    const nextStep = () => {
        dispatch(setActive_step(1));
    };
    const backStep = () => {
        dispatch(setBack_step(1));
    };
    const resetStep = () => {
        dispatch(reset_step(0));
    };

    const steps = ['Shipping Address', 'Payment Details'];

    return(
        <>
        <div/>
        <main style={{width: '100%'}}>
                <Typography className="checkout" variant="h4" align="center">Checkout</Typography>
                <Stepper className="stepper" activeStep={activeStep}>
                    {steps.map(step => (
                    <Step key={step}>
                        <StepLabel >{step}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation resetStep={resetStep} order={order}/> : token && <Form token={token} cart={cart} backStep={backStep} nextStep={nextStep} activeStep={activeStep}/>}
        </main>
        </>
    );
};

export default Checkout;