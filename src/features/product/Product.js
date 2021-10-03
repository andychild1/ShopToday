import Card from '../../components/card/Card';
import { useSelector } from 'react-redux';
import { selectCategory } from '../products/productsSlice';
import '../products/Product.css';

const Product = ({ products }) => {

    const category = useSelector(selectCategory);
    const prodList = products ? products.filter(prod => prod.categories.map(cat => cat.id)[0] === category.id) : [];
    
    return(
        <div className="productsContainer">
              <Card products={prodList} />
        </div>
    );
};

export default Product;