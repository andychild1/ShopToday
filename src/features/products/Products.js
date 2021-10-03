
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoadingProducts, selectProducts } from "./productsSlice";
import { loadProducts } from "./commerce";
import Product from '../product/Product';
import './Product.css';
import { CircularProgress } from '@material-ui/core';

const Products = () => {

const dispatch = useDispatch();
const loading = useSelector(isLoadingProducts);
const products = useSelector(selectProducts);

useEffect(() => {
    dispatch(loadProducts());
}, [dispatch]);

if (loading) return <div className="loading">Loading...<CircularProgress style={{color: 'aquamarine'}}/></div>;

    return(
        <div>
            <Product products={products.data} />
        </div>
    );
};

export default Products;