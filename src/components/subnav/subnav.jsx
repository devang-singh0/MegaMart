import './subnav.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { getCategories, setActiveCategory } from '../../store/slices/categories';
import { getCategoryProducts } from '../../store/slices/global';
export default function Subnav() {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
        dispatch(getCategoryProducts(categories?.activeCategory));
    }, []);
    let categories = useSelector((state) => state.categories);
    return (
        <>
            <ul id='categories'>
                {categories?.data.map(category => (
                    <li
                        key={category?._id}
                        onClick={(e) => {
                            dispatch(setActiveCategory({ type: category?._id }));
                            dispatch(getCategoryProducts(category?._id));
                        }}
                        className={categories.activeCategory === category?._id ? 'active' : ''}
                    >
                        {category?._id}
                    </li>
                ))}
            </ul>
        </>
    );
}