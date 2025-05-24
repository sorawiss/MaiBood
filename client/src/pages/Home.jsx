import React, { useState, useContext } from 'react'
import '../section/style/Home.css'
import { useQuery } from '@tanstack/react-query'


import cancel from '../assets/X.svg'

import FoodWrapper from '../coponents/FoodWrapper'
import { AuthContext } from '../AuthContext'
import { Link } from 'react-router-dom'
import Loading from '../coponents/Loading'
import Category from '../coponents/Category'
// Fetch Data Function
const baseURL = import.meta.env.VITE_BASE_URL

async function fetchCommunityFood(user) {
  try {
    const url = `${baseURL}/get-food${user ? `?zip_code=${user.zip_code}` : ''}`;
    const response = await fetch(url, {
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
    console.error("Error in fetchCommunityFood:", error);
    return [];
  }
}

async function fetchAllFood() {
  try {
    const url = `${baseURL}/get-food`;
    const response = await fetch(url, {
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
    console.error("Error in fetchAllFood:", error);
    return [];
  }
}

// Main Render
function Home() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { user } = useContext(AuthContext);


  // Fetch Data Queries
  const { data: communityData, isLoading: isLoadingCommunity } = useQuery({
    queryKey: ['get-community-food', user?.zip_code],
    queryFn: () => fetchCommunityFood(user),
  });

  const { data: allData, isLoading: isLoadingAll } = useQuery({
    queryKey: ['get-all-food'],
    queryFn: fetchAllFood,
  });

  if (isLoadingCommunity || isLoadingAll) {
    return (
      <Loading />
    );
  }

  // --- Filtering Logic ---
  const filterItems = (items) => {
    return items?.filter((item) => {
      const material = item?.material || '';
      const itemType = item?.type || '';
      const searchLower = searchText.toLowerCase();
      const materialLower = material.toLowerCase();
      const addressLower = item?.address?.toLowerCase();

      const matchesSearch = materialLower.includes(searchLower) || addressLower.includes(searchLower);
      const matchesCategory = selectedCategory === null ? true : itemType === selectedCategory;

      return matchesSearch && matchesCategory;
    }) || [];
  };

  const communityList = filterItems(communityData);
  const allList = filterItems(allData);

  // --- Category Click Handler ---
  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) => prevCategory === category ? null : category);
  };


  return (
    <div className="overall mb-[4rem] ">

      <div className='top-container'>
        <h2 className='hello'>สวัสดี {user && (user.fname)}</h2>
        <h2>ค้นหาอาหารที่ฟรีหรือมีราคาที่คุ้มค่า<br /> เพื่อตัวคุณและ
          <span className="highlight">ชุมชน</span>
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

        <Category selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} />
      </div> {/*second-container*/}


      {/* Food From Community */}
      {user && <div className='third-container'>
        <Link to={'/home/community-food'} className="title-wrapper flex justify-between items-center ">
          <h2> อาหารในชุมชน </h2>
          <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.8217 4.32166C14.1342 4.0092 14.5581 3.83368 15 3.83368C15.4419 3.83368 15.8658 4.0092 16.1783 4.32166L23.6783 11.8217C23.9908 12.1342 24.1663 12.558 24.1663 13C24.1663 13.4419 23.9908 13.8658 23.6783 14.1783L16.1783 21.6783C15.864 21.9819 15.443 22.1499 15.006 22.1461C14.569 22.1423 14.151 21.967 13.842 21.658C13.533 21.349 13.3577 20.931 13.3539 20.494C13.3501 20.057 13.5181 19.636 13.8217 19.3217L18.3333 14.6667H2.50001C2.05798 14.6667 1.63406 14.4911 1.3215 14.1785C1.00894 13.8659 0.833344 13.442 0.833344 13C0.833344 12.558 1.00894 12.134 1.3215 11.8215C1.63406 11.5089 2.05798 11.3333 2.50001 11.3333H18.3333L13.8217 6.67832C13.5092 6.36578 13.3337 5.94193 13.3337 5.49999C13.3337 5.05805 13.5092 4.6342 13.8217 4.32166Z" fill="#FCDB29" />
          </svg>
        </Link>
        <p className='p2 text-secondary ' >อาหารในบริเวณใกล้เคียงกับคุณ</p>

        <div className="allfood-container">
          {communityList.slice(0, 4).map((items) => <FoodWrapper key={items.id} id={items.id} exp={items.exp} 
          price={items.price} image={items.image} name={items.material} location={items.address} />)}
        </div>
      </div>}


      {/* Food From All */}
      <div className='third-container'>
      <Link to={'/home/all-food'} className="title-wrapper flex justify-between items-center ">
          <h2> อาหารทั้งหมด </h2>
          <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.8217 4.32166C14.1342 4.0092 14.5581 3.83368 15 3.83368C15.4419 3.83368 15.8658 4.0092 16.1783 4.32166L23.6783 11.8217C23.9908 12.1342 24.1663 12.558 24.1663 13C24.1663 13.4419 23.9908 13.8658 23.6783 14.1783L16.1783 21.6783C15.864 21.9819 15.443 22.1499 15.006 22.1461C14.569 22.1423 14.151 21.967 13.842 21.658C13.533 21.349 13.3577 20.931 13.3539 20.494C13.3501 20.057 13.5181 19.636 13.8217 19.3217L18.3333 14.6667H2.50001C2.05798 14.6667 1.63406 14.4911 1.3215 14.1785C1.00894 13.8659 0.833344 13.442 0.833344 13C0.833344 12.558 1.00894 12.134 1.3215 11.8215C1.63406 11.5089 2.05798 11.3333 2.50001 11.3333H18.3333L13.8217 6.67832C13.5092 6.36578 13.3337 5.94193 13.3337 5.49999C13.3337 5.05805 13.5092 4.6342 13.8217 4.32166Z" fill="#FCDB29" />
          </svg>
        </Link>
        <p className='p2 text-secondary ' >อาหารทั้งหมดใน "ไม่บูด"</p>

        <div className="allfood-container">
          {allList.slice(0, 4).map((items) => <FoodWrapper key={items.id} id={items.id} exp={items.exp} 
            price={items.price} image={items.image} 
            name={items.material} location={items.address} />)}
        </div>
      </div> {/*third-container*/}

    </div>
  )
}

export default Home