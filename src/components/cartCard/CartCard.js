import { useDispatch, useSelector } from "react-redux";
import './CartCard.css';
import { updateCart, removeCartItem } from "../../features/products/commerce";
import { selectLoadingCart } from "../../features/cart/cartSlice";
import { Link } from 'react-router-dom';


const CartCard = ({cart}) => {
   const dispatch = useDispatch();
   const loading = useSelector(selectLoadingCart);
   const cartItems = cart.cart.line_items;

   if (loading) {
       return <div className="loading">Loading Cart...</div>;
   };
   

    return(
        <div className="cartCard">
            <Link to="/">
            <button className="cartButton">Back</button>
            </Link>
            <div>
            {cartItems ? cartItems.map(item => <div key={item.id} className="itemCartName"><h3>{item.name}</h3>
            <img alt="product view" src={item.media.source}></img>
            <h3>{item.price.formatted_with_symbol}</h3>
            <h5>Quantity: {item.quantity}</h5>
            <div className="addRemoveBtn">
            <button onClick={() => dispatch(updateCart({productId: item.id, quantity: item.quantity + 1}))}>+</button>
            <button onClick={() => dispatch(updateCart({productId: item.id, quantity: item.quantity - 1}))}>-</button>
            </div>
            <button className="remove" onClick={() => dispatch(removeCartItem(item.id))}>Remove</button>
            </div>) : null}
            </div>
            <div className="totalPrice">
                <h4 className="total">Total</h4>
                <h2>{cartItems ? cart.cart.subtotal.formatted_with_symbol : null}</h2>
            </div>
            <div>
                <Link to="/checkout">
                    <button className="placeOrder">Place Order</button>
                </Link>
            </div>
        </div>
    );
};

export default CartCard;