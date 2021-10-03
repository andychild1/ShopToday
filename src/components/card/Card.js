import './Card.css';
import CardTemplate from './CardTemplate';

const Card = ({ products }) => {

return(
    <>
        {products.map(prod => (
            <CardTemplate key={prod.id} id={prod.id} name={prod.name} img={prod.media.source} desc={prod.description} price={prod.price}/>
        ))}
       </>
);
};
export default Card;