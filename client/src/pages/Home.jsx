import React, { useState, useContext } from 'react'
import '../section/style/Home.css'
import { useQuery } from '@tanstack/react-query'

import meat from '../assets/meat.svg'
import carrot from '../assets/carrot.svg'
import bread from '../assets/bread.svg'
import dot from '../assets/dot.svg'
import cancel from '../assets/X.svg'

import SectionTitle from '../coponents/SectionTitle'
import FoodWrapper from '../coponents/FoodWrapper'
import { AuthContext } from '../AuthContext'


// Fetch Data Function
const baseURL = import.meta.env.VITE_BASE_URL
async function fetchData() {
  try {
    const response = await fetch(`${baseURL}/get-food`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Network response was not ok (${response.status})`);
    }

    return await response.json();

  }
  catch (error) {
    console.log("error while fetch food", error)
  }
}



// Main Render
function Home() {
  const [searchText, setSearchText] = useState('');

  const { user } = useContext(AuthContext);


  // Fetch Data Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['get-food'],
    queryFn: fetchData,
  });

  if (isLoading) {
    return (
      <div className='fridge min-h-screen bg-white-bg w-full flex flex-col items-center justify-center py-[2.5rem] px-[2rem] gap-[3.25rem] '>
        <p>Loading fridge...</p>
      </div>
    );
  }
  if (isError) {
    console.log(error)
  }

  // Filter Function
  const list = data.filter((item) => {
    const list = item.material.toLowerCase();
    return list.includes(searchText.toLowerCase());
  })


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
          {list.map((items) => <FoodWrapper key={items.id} id={items.id} exp={items.exp} price={items.price} image={items.image} name={items.material} location={'Tops daily สาขาธรรมศาสตร'} />)}
        </div>
      </div> {/*third-container*/}




    </div>
  )
}

export default Home