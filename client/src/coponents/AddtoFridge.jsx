import React, { useState } from 'react'
import '../section/style/Add.css'
import { Link } from 'react-router-dom'

import { Input } from "rizzui";



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
              <Input
                type="date"
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
          </div>

          <div className="post">
            <p className='add-post'>บันทึก</p>
          </div>
          <div className="bottom-text-wrapper">
            <p className='end-text'>อาหารจะถูกบันทึกไว้ในตู้เย็นของคุณและ</p>
            <p className='end-text'>เราจะแจ้งเตือนเมื่อใกล้หมดอายุ</p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default AddtoFridge