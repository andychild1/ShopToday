import Card from '../../components/card/Card';
import { useSelector } from 'react-redux';
import { selectSelectedCategory, selectCategory } from '../products/productsSlice';
import '../products/Product.css';

const Product = ({ products }) => {

    const selectedCategory = useSelector(selectSelectedCategory);
    const category = useSelector(selectCategory);
    const prodList = products ? products.filter(prod => prod.categories.map(cat => cat.id)[0] === category.id) : [];
    
    return(
        <div className="productsContainer">
            <h2 className="category">{selectedCategory}</h2>
              <Card products={prodList} />
        </div>
    );
};

export default Product;