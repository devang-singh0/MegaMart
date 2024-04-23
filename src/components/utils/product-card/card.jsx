import './card.scss'
import { useNavigate } from 'react-router-dom'
export default function Card({ data }) {
    let navigate = useNavigate();
    return (
        <>
            <div id="card" onClick={() => navigate(`/product/${data._id}`)}>
                <div className='wrapper'>
                    <div style={{ backgroundImage: `url(${data.thumbnail})` }}></div>
                </div>
                <p>{data.discountPercentage < 10 ? `0${Math.floor(data.discountPercentage)}` : Math.floor(data.discountPercentage)}% off</p>
                <h3>{data.title}</h3>
                <h4><span>${data.price}</span> <span>${Math.ceil((data.price) * (100 + data.discountPercentage) / 100)}</span></h4>

                <div className="rating-line" style={{ background: `linear-gradient(to right, red, #ebb734, green)` }}>
                    <div style={{
                        background: `linear-gradient(to right, transparent, transparent ${data.rating.rate * 20}%, #ededed ${data.rating.rate * 20}%)`,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%'
                    }}></div>
                </div>

                <h5>Save &nbsp;-&nbsp; ${Math.ceil((data.price) * (100 + data.discountPercentage) / 100 - data.price)}</h5>
            </div>
        </>
    )
}
