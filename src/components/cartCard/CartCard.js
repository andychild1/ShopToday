import { useDispatch, useSelector } from "react-redux";
import './CartCard.css';
import { updateCart, removeCartItem } from "../../features/products/commerce";
import { selectLoadingCart } from "../../features/cart/cartSlice";
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { MdDelete } from 'react-icons/md';


const CartCard = ({cart}) => {
   const dispatch = useDispatch();
   const loading = useSelector(selectLoadingCart);
   const cartItems = Object.entries(cart.cart).length === 0 ? [] : cart.cart.line_items;

   if (loading) {
       return <div className="loading">Loading Cart...<CircularProgress style={{color: 'aquamarine'}}/></div>;
   };
   

    return(
        <div>
            <div className="cartCard">
            {cartItems ? cartItems.map(item => <div key={item.id} className="itemCartName"><h3>{item.name}</h3>
            <img alt="product view" src={item.media.source}></img>
            <h3>{item.price.formatted_with_symbol}</h3>
            <h5>Quantity: {item.quantity}</h5>
            <div className="addRemoveBtn">
            <button onClick={() => dispatch(updateCart({productId: item.id, quantity: item.quantity + 1}))}>+</button>
            <button onClick={() => dispatch(updateCart({productId: item.id, quantity: item.quantity - 1}))}>-</button>
            </div>
            <MdDelete className="remove" onClick={() => dispatch(removeCartItem(item.id))}>Remove</MdDelete>
            </div>) : null}
            </div>
            <div className="totalPrice">
                <h4 className="total">Total</h4>
                <h2>{cartItems.length ? cart.cart.subtotal.formatted_with_symbol : null}</h2>
            </div>
            <div className="buttons">
               <Link to="/">
                   <button className="cartButton">Back</button>
               </Link>
               {cartItems.length ? <Link to="/checkout"><button className="placeOrder">Place Order</button></Link> : 'Cart Empty'}
            </div>
        </div>
    );
};

export default CartCard;