import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from '../../features/checkout/checkoutSlice';
import { checkoutProcess, fetchShippingCountries, fetchShippingOptions, fetchSubdivisions, } from '../../features/products/commerce';
import { selectActiveStep, selectIncomingOrder, selectShippingCountry, selectShippingSubdivision, setActive_step, setBack_step, reset_step } from '../../features/checkout/checkoutSlice';
import { useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography } from '@material-ui/core';
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
    }, [token.id, dispatch]);

    useEffect(() => {
        if (shippingCountry) {
            dispatch(fetchSubdivisions(shippingCountry));
        }
    });

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
                {activeStep === steps.length ? <Confirmation resetStep={resetStep} order={order}/> : token && <Form token={token} cart={cart} backStep={backStep} nextStep={nextStep} activeStep={activeStep}/>}
            </Paper>
        </main>
        </>
    );
};

export default Checkout;