import { useEffect } from 'react';
import { loadCart } from '../products/commerce';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../../components/cart/Cart';
import { selectCart } from './cartSlice';
import { useLocation } from 'react-router-dom';

const Carts = () => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const location = useLocation();

    useEffect(() => {
         dispatch(loadCart());
    }, [cart.cart.total_items, dispatch]);


    return(
        <div>
            {location.pathname === '/' && <Cart cart={cart}/>}
        </div>
    );
};
export default Carts;