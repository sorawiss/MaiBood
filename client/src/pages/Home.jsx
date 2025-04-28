import React, { useState, useContext } from 'react'
import '../section/style/Home.css'

import meat from '../assets/meat.svg'
import carrot from '../assets/carrot.svg'
import bread from '../assets/bread.svg'
import dot from '../assets/dot.svg'
import cancel from '../assets/X.svg'

import SectionTitle from '../coponents/SectionTitle'
import FoodWrapper from '../coponents/FoodWrapper'
import {AuthContext} from '../AuthContext'


async function fetchData() {
  

}






// Main Render
function Home() {
  const [searchText, setSearchText] = useState('');

  const { user } = useContext(AuthContext);

  const List = [...Array(4)]


  return (
    <div className="overall pb-[3rem] ">

      <div className='top-container'>
        <h2 className='hello'>สวัสดี {user.fname}</h2>
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


      {/* Food From Shop */}
      <div className='third-container'>
        <SectionTitle title={'อาหารจากร้านค้า'} />
        <div className="allfood-container">
          {List.map((items, index) => <FoodWrapper key={index} exp={'11-05-2568'} price={'78'} name={'เนื้อหมูบด'} location={'Tops daily สาขาธรรมศาสตร'} />)}
        </div>
      </div> {/*third-container*/}

      {/* Free Food */}
      <div className='third-container'>
        <SectionTitle title={'อาหารฟรี'} />
        <div className="allfood-container">
          {List.map((items, index) => <FoodWrapper key={index} exp={'11-05-2568'} price={'78'} name={'เนื้อหมูบด'} location={'Tops daily สาขาธรรมศาสตร'} />)}
        </div>
      </div> {/*third-container*/}

      {/* Food From Community */}
      <div className='third-container'>
        <SectionTitle title={'อาหารจากชุมชน'} />
        <div className="allfood-container">
          {List.map((items, index) => <FoodWrapper key={index} exp={'11-05-2568'} price={'78'} name={'เนื้อหมูบด'} location={'Tops daily สาขาธรรมศาสตร'} />)}
        </div>
      </div> {/*third-container*/}

      

    </div>
  )
}

export default Home