import Check from '../../resources/pngegg.png';
import { CircularProgress, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

let Confirmation = ({ order, resetStep }) => {
    return(
        <>
        {order.customer ? (
    <div style={{ marginTop: '150px' , display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        <h3>Thank You, {order.customer.firstname} {order.customer.lastname}</h3>
        <h4>Order Confirmed</h4>
        <p>Order ref: {order.customer_reference}</p>
        <div style={{ width: '100%', height: '200px'}}>
            <img style={{ width: '200px', height: '200px' }} src={Check} alt="confirmation symbol"></img>
        </div>
        <Button component={Link} to="/" onClick={resetStep} style={{background: 'lightgrey', margin: '10px'}}>Back To Shopping</Button>
    </div>
) :
(
    <div>
        <CircularProgress />
    </div>
)}
        </>
    );
};
export default Confirmation;