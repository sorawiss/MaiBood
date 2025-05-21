import React, { useState, useContext } from 'react'
import '../section/style/Add.css'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query';

import Button from '../coponents/CustomButton';
import BackArrow from './BackArrow';

import { AuthContext } from '../AuthContext';


const baseUrl = import.meta.env.VITE_BASE_URL;
async function fetchAddFridge(data) {
  const response = await fetch(`${baseUrl}/add-to-fridge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Fetch add fridge response was not ok')
  }

  const dataFromServer = await response.json()
  return dataFromServer
}


function AddtoFridge() {
  const [form, setForm] = useState({
    material: '',
    exp: ''
  })
  const [error, setError] = useState('')
  const { user } = useContext(AuthContext);
  const [successEffect, setSuccessEffect] = useState(false);


  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }


  const mutation = useMutation({
    mutationFn: fetchAddFridge,
    onSuccess: (data) => {
      console.log("Add fridge success")
      setError('')
      setForm({
        material: '',
        exp: ''
      })

      setSuccessEffect(true);  // Trigger success effect
      setTimeout(() => {
        setSuccessEffect(false);  // Clear effect after 2 seconds
      }, 2000);
    },
    onError: (error) => {
      console.log("Add fridge error", error)
    }
  })



  // Submit Form
  //----------------------------//
  function submitForm(e) {
    e.preventDefault()

    if (!form.material || !form.exp) {
      setError('*กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }
    if (form.exp < new Date().toISOString().split('T')[0]) {
      setError('อาหารบูดห้ามเอาเข้าตู้เย็นนะครับ 🙂')
      return
    }

    const dataTosend = {
      material: form.material,
      exp: form.exp,
      owner: user.id
    }

    mutation.mutate(dataTosend)
  }




  return (
    <div className='overall min-h-screen bg-white-bg w-full flex px-[2rem] '>
      <BackArrow />

      <div className="add-wrapper ">
        <div className="header-title flex flex-col items-center gap-[0.5rem] ">
          <h2 className='text-primary ' >เพิ่มอาหารเข้าตู้เย็น</h2>
          <p className='p2 text-secondary ' >อาหารจะอยู่ในตู้เย็นส่วนตัวและแจ้งเตือนเมื่อใกล้หมดอายุ (3 วัน)</p>
        </div>

        <div className="details">
          <div className="food-details">
            <div className="add-detail">
              <input
                type="text"
                value={form.material}
                placeholder="ใส่ชื่ออาหาร..."
                className="foodname-input"
                name='material'
                onChange={handleChange}
                required
                autoComplete='off'
              />
            </div>
            <div className="add-detail">
              <input
                type="date"
                name='exp'
                value={form.exp}
                onChange={handleChange}
                required
                autoComplete='off'
                placeholder='วันที่หมดอายุ'
                className="w-full text-secondary "
              />
            </div>
          </div>


          <Button
            onClick={submitForm}
            className={`post ${successEffect ? 'success-effect ' : ''}`}
          >
            <p className='add-post'>{successEffect ? 'บันทึกสำเร็จ✔️' : 'บันทึก'}</p>
          </Button>



          <p className='alert' >{error}</p>
          <Link to={'/add'} className="bottom-text-wrapper">
            <p className='end-text'>หากต้องการเพิ่มอาหารไปยังร้านค้าเพื่อขาย</p>
            <p className='end-text'>กดที่นี่</p>
          </Link>


        </div>

      </div>

    </div>
  )
}

export default AddtoFridge