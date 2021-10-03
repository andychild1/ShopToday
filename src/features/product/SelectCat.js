import { selectCategories, select_category, selectSelectedCategory } from '../products/productsSlice';
import { loadCategories, loadCategory } from '../products/commerce';
import { useSelector, useDispatch } from "react-redux"; 
import { useEffect } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import './SelectCat.css';

const SelectCat = () => {

    const dispatch = useDispatch();
    const data = useSelector(selectCategories);
    const selectedCategory = useSelector(selectSelectedCategory);
    const categories = data.data ? data.data : [];
    const categoryId = categories.filter(item => item.name === selectedCategory);
    const catId = categoryId.map(id => id.id)[0];

    useEffect(() => {
        dispatch(loadCategories());
    }, [dispatch]);

    useEffect(() => {
       dispatch(loadCategory(catId));
    }, [dispatch, catId]);


    return(
        <div className="custom-select">
        <Select style={{width: '200px'}} name="categories" value={selectedCategory} onChange={(e) => dispatch(select_category(e.target.value))}>
            {categories ? categories.map(cat => <MenuItem  value={cat.name} key={cat.id}>{cat.name}</MenuItem>) : []}
        </Select>
        </div>
    );
};
export default SelectCat;