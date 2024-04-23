
import Subnav from '../components/subnav/subnav.jsx';
import Card from '../components/utils/product-card/card.jsx';
import FeaturedProducts from '../components/featured/featured.jsx';
import TopBrand from '../components/topBrands/topBrands.js';
import ImageSlider from '../components/imageSlider/imageSlider.js';
import TopCategory from '../components/topCategories/topCategories.jsx';

function Home() {
    return (
        <>
            <Subnav></Subnav>
            <ImageSlider></ImageSlider>
            <FeaturedProducts></FeaturedProducts>
            <TopBrand></TopBrand>
            <TopCategory></TopCategory>
        </>
    )
}

export default Home;