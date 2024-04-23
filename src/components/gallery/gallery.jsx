import './gallery.scss'
import { useParams } from 'react-router-dom'
import { ReactComponent as StarSVG } from '../svg/star.svg';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../store/slices/categories';
import products, { getProducts } from '../../store/slices/products';
import { CaretLeft, CaretRight, CaretDoubleRight, CaretDoubleLeft, FadersHorizontal } from 'phosphor-react';
import Card from '../utils/product-card/card';
import ReactSlider from 'react-slider';
import { setFilters } from '../../store/slices/products';
export default function Gallery() {
    let dispatch = useDispatch();
    let products = useSelector((state) => state.products);
    let { category } = useParams();
    useEffect(() => {
        dispatch(setFilters({
            discount: 0,
            rating: 0,
            price: [1, 2500],
            category: "",
            limit: 10,
            page: 1,
            sort: {
                value: "Sort by",
                index: 0,
            },
            totalPages: 1,
            totalProducts: 0
        }));
        category && dispatch(setFilters({ category }));
        dispatch(getProducts());
    }, [category]);
    function filter(filter) {
        dispatch(setFilters(filter));
        dispatch(getProducts());
    }
    return (
        <div id="gallery" >
            <div className="button" onClick={() => document.querySelector('.filters').classList.toggle('active')}><FadersHorizontal size={32} /></div>
            <Filters />
            <div className="main">
                <div className="sort">
                    <select onChange={e => filter({ sort: { value: e.target.value, index: e.target.selectedIndex } })} value={products?.extras.sort.value}>
                        <option>Sort by</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Rating: Low to High</option>
                        <option>Rating: High to Low</option>
                        <option>Discount: Low to High</option>
                        <option>Discount: High to Low</option>
                    </select>
                    <select onChange={(e) => filter({ limit: e.target.value })}>
                        <option>Items per page</option>
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                    </select>
                </div>
                <div className="products">
                    {products?.data?.map((product, index) => (
                        <Card key={index} data={product} />
                    ))}
                </div>
                <div className="pages">
                    <div>Showing {((products?.extras.page - 1) * products?.extras.limit) + 1}-{((products?.extras.page - 1) * products?.extras.limit) + products?.data?.length} of {products?.extras.totalProducts} products</div>
                    <div className="btns">
                        <button onClick={e => filter({ page: 1 })}><CaretDoubleLeft /></button>
                        <button><CaretLeft onClick={() => (products?.extras.page != 1) && filter({ page: products?.extras.page - 1 })} /></button>
                        {
                            products?.extras.totalPages > 1 &&
                            [...Array(products?.extras.totalPages).keys()].map((i) => {
                                if (i < 2 || (i >= products?.extras.page - 1 && i <= products?.extras.page) || i > products?.extras.totalPages - 3) {
                                    return <button key={i} onClick={() => filter({ page: i + 1 })} className={i + 1 == products?.extras.page ? 'active' : ''}>{i + 1}</button>
                                }
                                else if (i === 2 || i === products?.extras.totalPages - 3) {
                                    return <span key={i}>..</span>
                                }
                            })
                        }
                        <button onClick={() => (products?.extras.page != products?.extras.totalPages) && filter({ page: products?.extras.page + 1 })}><CaretRight /></button>
                        <button onClick={() => filter({ page: products?.extras.totalPages })}><CaretDoubleRight /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Filters() {
    let products = useSelector((state) => state.products);
    let [price, setPrice] = useState(products?.extras.price);
    let dispatch = useDispatch();
    let categories = useSelector((state) => state.categories);
    useEffect(() => {
        dispatch(getCategories());
    }, []);
    function filter(filter) {
        dispatch(setFilters(filter));
        dispatch(getProducts());
    }
    return (
        <div className="filters">
            <div className="discount">
                <h3>Discount</h3>
                <button onClick={e => filter({ discount: 5 })} className={products?.extras.discount == 5 ? 'active' : ''}>5% or more off</button>
                <button onClick={e => filter({ discount: 10 })} className={products?.extras.discount == 10 ? 'active' : ''}>10% or more off</button>
                <button onClick={e => filter({ discount: 15 })} className={products?.extras.discount == 15 ? 'active' : ''}>15% or more off</button>
                <button onClick={e => filter({ discount: 20 })} className={products?.extras.discount == 20 ? 'active' : ''}>20% or more off</button>
            </div>
            <div className="rating">
                <h3>Rating</h3>
                <Rate value={4} onClick={e => filter({ rating: 4 })} />
                <Rate value={3} onClick={e => filter({ rating: 3 })} />
                <Rate value={2} onClick={e => filter({ rating: 2 })} />
                <Rate value={1} onClick={e => filter({ rating: 1 })} />
            </div>
            <div className="price">
                <h3>Price</h3>
                <div>
                    <input type="number" max={2500} min={1} value={price[0]} onChange={e => setPrice([e.target.value, ...price.slice(1)])} />
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="thumb"
                        trackClassName="track"
                        min={1}
                        max={2500}
                        step={1}
                        value={price}
                        onChange={e => setPrice(e)}
                        pearling
                        minDistance={50}
                    />
                    <input type="number" max={2500} min={1} value={price[1]} onChange={e => setPrice([...price.slice(0, -1), e.target.value])} />
                </div>
                <button onClick={e => filter({ price })}>Apply</button>
            </div>
            <div className="categories">
                <h3>Categories</h3>
                <ul>{categories?.data.map((category, index) => (
                    <li key={index} onClick={e => filter({ category: category?._id })}>{category?._id}</li>
                ))}</ul>
            </div>
            <button onClick={e => filter(
                {
                    discount: 0,
                    rating: 0,
                    price: [1, 2500],
                    category: "",
                }
            )}>Reset filters</button>
        </div >
    )
}

function Rate({ onClick, value }) {
    return (
        <div className="rate" onClick={onClick}>
            {[1, 2, 3, 4, 5].map((i) => (
                <StarSVG key={i} className={i <= value ? 'active' : ''} />
            ))}  &nbsp;  & above
        </div>
    )
}