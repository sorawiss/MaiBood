import React, { useState } from 'react'
import '../section/style/Home.css'

import meat from '../assets/meat.svg'
import carrot from '../assets/carrot.svg'
import bread from '../assets/bread.svg'
import dot from '../assets/dot.svg'
import cancel from '../assets/X.svg'
import test from '../assets/22464.jpg'


function Home() {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="overall">

      <div className='top-container'>
        <h2 className='hello'>สวัสดี name</h2>
        <h2>ค้นหาอาหารที่ฟรีหรือมีราคาที่คุ้มค่า<br /> เพื่อตัวคุณและ
          <span className="highlight">โลกของเรา</span>
        </h2>
      </div> {/*top-container*/}

      <div className='second-container'>

        <div className="search-box">
          <input
            type="text"
            placeholder="ค้นหา..."
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <img
            src={cancel} alt='clear search text' onClick={() => setSearchText('')}
            style={{ cursor: 'pointer' }}>
          </img>
        </div>

        <div className="category-button">

          <button className='circle-button'>
            <img src={meat} alt='meat category button'></img>
          </button>

          <button className='circle-button'>
            <img src={carrot} alt='vegetable category button'></img>
          </button>

          <button className='circle-button'>
            <img src={bread} alt='bread category button'></img>
          </button>

          <button className='circle-button'>
            <img src={dot} alt='other category button'></img>
          </button>

        </div>
      </div> {/*second-container*/}

      <div className='third-container'>

        <div className='th-top-wrapper'>
          <h2>อาหารจากร้านค้า</h2>
          <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.8217 4.32166C14.1342 4.0092 14.5581 3.83368 15 3.83368C15.4419 3.83368 15.8658 4.0092 16.1783 4.32166L23.6783 11.8217C23.9908 12.1342 24.1663 12.558 24.1663 13C24.1663 13.4419 23.9908 13.8658 23.6783 14.1783L16.1783 21.6783C15.864 21.9819 15.443 22.1499 15.006 22.1461C14.569 22.1423 14.151 21.967 13.842 21.658C13.533 21.349 13.3577 20.931 13.3539 20.494C13.3501 20.057 13.5181 19.636 13.8217 19.3217L18.3333 14.6667H2.49999C2.05797 14.6667 1.63404 14.4911 1.32148 14.1785C1.00892 13.8659 0.833328 13.442 0.833328 13C0.833328 12.558 1.00892 12.134 1.32148 11.8215C1.63404 11.5089 2.05797 11.3333 2.49999 11.3333H18.3333L13.8217 6.67832C13.5092 6.36578 13.3337 5.94193 13.3337 5.49999C13.3337 5.05805 13.5092 4.6342 13.8217 4.32166Z" fill="#FCDB29" />
          </svg>
        </div>

        <div className="allfood-container">
          <div className="food-container">
            <div className="food-pic">
              <img src={test}></img>
              <div className="detail">
                <div className="exp-date">
                  <p className='exp'>24-04-2568</p>
                </div>
                <div className="space-for-price">
                  <div className="price">
                    <p className='price-number'>49</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="food-description-wrapper">
              <p className="food-name">เนื้ออกไก่</p>
              <p className="food-seller">Tops daily สาขาธรรมศาสตร</p>
            </div>
          </div>
          <div className="food-container">
            <div className="food-pic">
              <div className="detail">
                <div className="exp-date">
                  <p className='exp'>11-05-2568</p>
                </div>
                <div className="space-for-price">
                  <div className="price">
                    <p className='price-number'>78</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="food-description-wrapper">
              <p className="food-name">เนื้อหมูบด</p>
              <p className="food-seller">Tops daily สาขาธรรมศาสตร</p>
            </div>
          </div>
          <div className="food-container">
            <div className="food-pic">
              <div className="detail">
                <div className="exp-date">
                  <p className='exp'>14-03-2568</p>
                </div>
                <div className="space-for-price">
                  <div className="price">
                    <p className='price-number'>14</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="food-description-wrapper">
              <p className="food-name">มะม่วง</p>
              <p className="food-seller">Tops daily สาขาธรรมศาสตร</p>
            </div>
          </div>
          <div className="food-container">
            <div className="food-pic">
              <div className="detail">
                <div className="exp-date">
                  <p className='exp'>07-06-2568</p>
                </div>
                <div className="space-for-price">
                  <div className="price">
                    <p className='price-number'>21</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="food-description-wrapper">
              <p className="food-name">ขนมปัง</p>
              <p className="food-seller">Tops daily สาขาธรรมศาสตร</p>
            </div>
          </div>
        </div>

      </div> {/*third-container*/}

      

    </div>
  )
}

export default Home