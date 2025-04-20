import React from 'react'

import '../section/style/Home.css'

function FoodWrapper( { exp, price, name, location } ) {
    return (
        <div className="food-container">
            <div className="food-pic">
                <img src=''></img>
                <div className="detail">
                    <div className="exp-date">
                        <p className='exp'> {exp} </p>
                    </div>
                    <div className="space-for-price">
                        <div className="price">
                            <p className='price-number'> {price} </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="food-description-wrapper">
                <p className="food-name"> {name} </p>
                <p className="food-seller"> {location} </p>
            </div>
        </div>
    )
}

export default FoodWrapper