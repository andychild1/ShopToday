import { addToCart } from '../../features/products/commerce';
import { useDispatch } from 'react-redux';

const CardTemplate = ({ name, img, desc, price, id }) => {

    const dispatch = useDispatch();

    const addItemToCart = () => {
        dispatch(addToCart({ productsId: id, quantity: 1 }));
    }

    return(
        <div className="cardContainer">
             <h3>{name}</h3>
             <img alt="product view" src={img}></img>
             <p dangerouslySetInnerHTML={{__html: desc}}></p>
             <h3>{price.formatted_with_symbol}</h3>
             <button onClick={addItemToCart} className="addToCart">Add To Cart</button>
             </div>
    );
};
export default CardTemplate;