import './Card.css';
import { addToCart } from '../../features/products/commerce';
import { useDispatch } from 'react-redux';


const Card = ({products}) => {
    const dispatch = useDispatch();
    
    const addItemToCart = () => {
        dispatch(addToCart({ productsId: products.id, quantity: 1 }));
    }

return(
    <div className="cardContainer">
       <h3>{products.name}</h3>
       <img  alt="product view" src={products.media.source}></img>
       <p dangerouslySetInnerHTML={{__html: products.description}}></p>
       <h3>{products.price.formatted_with_symbol}</h3>
       <button onClick={addItemToCart} className="addToCart">Add To Cart</button>
    </div>
);
};
export default Card;