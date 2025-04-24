import React, { useState }  from 'react'
import '../section/style/Add.css'
import { Link } from 'react-router-dom'

function AddtoFridge() {
    return (
      <div className='overall min-h-screen bg-white-bg w-full flex '>

        <div className="add-wrapper">

          <div className="sell-fridge">
            <div className="text-wrapper">
              <p className='sell'>
                <Link to={'/add'}>ขาย</Link></p>
              <p className='fridge'>ใส่ตู้เย็น</p>
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
            </div>

            <div className="post">
              <p className='add-post'>บันทึก</p>
            </div>
          </div>

        </div>

      </div>
    )
  }
  
  export default AddtoFridge