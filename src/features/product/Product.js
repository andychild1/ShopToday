import Card from '../../components/card/Card';
import '../products/Product.css';

const Product = ({products}) => {
    
    return(
        <div className="productsContainer">
            <h2 className="category">{products ? products.map(items => items.categories.map(cat => cat.name)) : null}</h2>
            {products ? products.map(items => <Card products={items} key={items.id}/>) : null}
        </div>
    );
};

export default Product;