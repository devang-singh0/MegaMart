import { useSelector } from "react-redux";
import { CaretRight } from "phosphor-react";
import './featured.scss'
import Card from "../utils/product-card/card";
import { useNavigate } from "react-router-dom";
export default function FeaturedProducts() {
    let navigate = useNavigate();
    let products = useSelector((state) => state.categories);
    return (
        <>
            <div id="featured">
                <div className="featuredProducts">
                    <h3>Best deals on <span>{ products.activeCategory }</span></h3>
                    <p onClick={()=> navigate(`/products/${products.activeCategory}`)}><span>View All</span> <span><CaretRight size={18} /></span></p>
                </div>
                <div>
                    {products?.activeCategoryProducts?.slice(0, 5).map((product, index) => (
                        <Card data={product} key={index} />
                    ))}
                </div>
            </div>
        </>
    )
}