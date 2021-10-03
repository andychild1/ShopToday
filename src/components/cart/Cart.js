import { BsBucket } from 'react-icons/bs';
import './Cart.css';
import { Link } from 'react-router-dom';
 

const Cart = ({cart}) => {
const cartTotal = cart.cart.total_items;

    return(
        <div>
            <h3>
                <Link to="/cart">
                <BsBucket className="cart" />
                </Link>
            </h3>
            <h5 className="cartNumber">{cartTotal}</h5>
        </div>
    );
};
export default Cart;