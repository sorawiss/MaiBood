import React from 'react'
import { Link } from 'react-router-dom'
import { getImageUrl } from '../lib/imageUtils'
import thaiDate from '../lib/thaiDate'

import '../section/style/Home.css'

function FoodWrapper({ id, exp, price, name, location, image }) {
    const time = new Date(exp)

    
    return (
        <Link to={'/home/inpost/' + id} >
            <div className="food-container">
                <div className="food-pic">
                    <img src={getImageUrl(image)} alt={name} loading='lazy' />
                    <div className="detail">
                        <div className="exp-date">
                            <p className='exp'> {thaiDate(time)} </p>
                        </div>
                    </div>
                </div>
                <div className="food-description-wrapper">
                    <p className="food-name"> {name} </p>
                    <p className="food-seller"> {location} </p>
                </div>
            </div>
        </Link>

    )
}

export default FoodWrapper