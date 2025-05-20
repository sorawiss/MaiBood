import React from 'react'

import meat from '../assets/meat.svg'
import carrot from '../assets/carrot.svg'
import bread from '../assets/bread.svg'
import dot from '../assets/dot.svg'

import '../section/style/Home.css'

function Category({ selectedCategory, handleCategoryClick }) {
    return (
        <div className="category-button flex justify-between items-center w-full">

            <button
                onClick={() => handleCategoryClick(1)} >
                <div className={`icon-wrapper  circle-button ${selectedCategory === 1 ? 'active-category' : ''}`}>
                    <img src={meat} alt='meat category button'></img>
                </div>
                <p className='p2 text-secondary ' >เนื้อสัตว์</p>
            </button>

            <button
                onClick={() => handleCategoryClick(2)} >
                <div className={`icon-wrapper  circle-button ${selectedCategory === 2 ? 'active-category' : ''}`}>
                    <img src={carrot} alt='vegetable category button'></img>
                </div>
                <p className='p2 text-secondary ' >ผัก</p>
            </button>

            <button
                onClick={() => handleCategoryClick(3)} >
                <div className={`icon-wrapper  circle-button ${selectedCategory === 3 ? 'active-category' : ''}`}>
                    <img src={bread} alt='bread category button'></img>
                </div>
                <p className='p2 text-secondary ' >ขนม</p>
            </button>

            <button
                onClick={() => handleCategoryClick(4)} >
                <div className={`icon-wrapper  circle-button ${selectedCategory === 4 ? 'active-category' : ''}`}>
                    <img src={dot} alt='all categories button'></img>
                </div>
                <p className='p2 text-secondary ' >อื่น ๆ</p>
            </button>

        </div>
    )
}

export default Category