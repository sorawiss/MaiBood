import React, { useState, useContext } from 'react'
import '../section/style/Add.css'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query';

import { Input, Button } from "rizzui";
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
      }, 1000);
    },
    onError: (error) => {
      console.log("Add fridge error", error)
    }
  })


  function submitForm(e) {
    e.preventDefault()

    if (!form.material || !form.exp) {
      setError('*กรุณากรอกข้อมูลให้ครบถ้วน')
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
    <div className='overall min-h-screen bg-white-bg w-full flex '>
      <BackArrow />

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
              <Input
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
              <Input
                type="date"
                name='exp'
                value={form.exp}
                onChange={handleChange}
                required
                autoComplete='off'
                className="exp-input w-full text-secondary "
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