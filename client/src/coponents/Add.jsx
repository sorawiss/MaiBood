import React, { useState }  from 'react'
import '../section/style/Add.css'
import { Link } from 'react-router-dom'

function Add() {
    return (
      <div className='overall min-h-screen bg-white-bg w-full flex '>

        <div className="add-wrapper">

          <div className="sell-fridge">
            <div className="text-wrapper">
              <p className='sell'>ขาย</p>
              <p className='fridge'>
              <Link to={'/add-to-fridge'}>ใส่ตู้เย็น</Link></p>
            </div>
            <div className="slide-bar" ></div>
          </div>

          <div className="details">
            <div className="food-details">
              <div className="add-detail">
                <input
                  type="text"
                  placeholder="ใส่ชื่ออาหาร..."
                  className="foodname-input"
                />
              </div>
              <div className="add-detail">
                <input
                  type="text"
                  placeholder="วันหมดอายุ"
                  className="exp-input"
                />
              </div>
              <div className="add-detail">
                <input
                  type="text"
                  placeholder="ประเภท"
                  className="category-input"
                />
              </div>
            </div>
            <div className="price-banner">
              <input
                type="text"
                placeholder="ราคา (ใส่ 0 บาทได้)"
                className="price-input"
              />
            </div>
            <div className="post">
              <p className='add-post'>ลงประกาศ</p>
            </div>
          </div>

        </div>

      </div>
    )
  }
  
  export default Add