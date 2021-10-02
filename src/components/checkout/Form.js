import CheckoutForm from "./CheckoutForm";
import PaymentForm from "./PaymentForm";

const Form = ({ token, cart, next, backStep, nextStep, activeStep, resetStep }) => {
    return(
        <>
        {activeStep === 0
? <CheckoutForm token={token} cart={cart} next={next} nextStep={nextStep}/>
: <PaymentForm token={token} back={backStep} nextStep={nextStep} resetStep={resetStep}/>}
        </>
    );
};
export default Form;