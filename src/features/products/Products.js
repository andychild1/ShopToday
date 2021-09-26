import { loadProducts } from "./commerce";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, isLoadingProducts } from "./productsSlice";
import Product from '../product/Product';
import './Product.css';

const Products = () => {

const dispatch = useDispatch();
const products = useSelector(selectProducts);
const loading = useSelector(isLoadingProducts);

useEffect(() => {
       dispatch(loadProducts());
}, [dispatch]);

if (loading) return <div className="loading">Loading...</div>;

    return(
        <div>
            <Product products={products.data}/>
        </div>
    );
};

export default Products;