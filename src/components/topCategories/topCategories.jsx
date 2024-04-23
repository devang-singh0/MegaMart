import './topCategories.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
export default function TopCategory() {
    let categories = useSelector(state => state.categories.data);
    let color1 = ['#f37142', '#ffe599', '#ccb8fd', '#ffbcdf', '#ffd2d2', '#96df8b', '#4a7ba6', '#feadb9', '#c3b5ff', '#af7c74'];
    let color2 = ['#eb6b1c', '#e6c77e', '#9e8ce5', '#e68fb3', '#e6a6a6', '#88e579', '#325c7f', '#e68a8f', '#a899e6', '#8a5b57'];
    return (
        <>
            <div className="topCategories">
                <h3>Shop from <span>Top Caregories</span></h3>
            </div>
            <div>
                {/* {catData?.map((e)=> <TopCategories key={e.id} data={e}/>)} */}
                
                {categories?.map((e, index) => <TopCategories key={e.index} name={e._id} clr1={color1[index]} clr2={color2[index]}/>)}
            </div>
        </>
    )
}

function TopCategories({ name, clr1, clr2 }) {
    let navigate = useNavigate();
    return (
        <>
            <div id="topCategories" style={{ '--clr1': `linear-gradient(${clr1}, ${clr2})`, '--clr2': clr2 }} onClick={()=> navigate(`/products/${name}`)}>
                <div className="dis-ribbon"><span>{Math.floor(Math.random() * 7 + 4) * 5} % Off</span></div>
                <p>Shop <br /> {name}</p>
            </div>
        </>
    )
}