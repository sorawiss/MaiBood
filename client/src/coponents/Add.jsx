import React, { useState, useContext } from 'react'
import '../section/style/Add.css'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query';

import { Input, Button } from "rizzui";
import BackArrow from './BackArrow';

import { AuthContext } from '../AuthContext';


// Fetch API function 
const baseUrl = import.meta.env.VITE_BASE_URL;
async function fetchAddFridge(formData) {
  const response = await fetch(`${baseUrl}/image`, {
    method: 'POST',
    body: formData, 
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Fetch add, sell response was not ok');
  }

  const dataFromServer = await response.json();
  return dataFromServer;
}


function AddtoFridge() {
  const [form, setForm] = useState({
    material: '',
    exp: ''
  })
  const [error, setError] = useState('')
  const { user } = useContext(AuthContext);
  const [successEffect, setSuccessEffect] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }


  const mutation = useMutation({
    mutationFn: fetchAddFridge,
    onSuccess: (data) => {
      console.log("Add fridge success", data)
      setError('')
      setForm({
        material: '',
        exp: ''
      })

      setSuccessEffect(true);
      setTimeout(() => {
        setSuccessEffect(false); 
      }, 1000);
    },
    onError: (error) => {
      console.log("Add fridge error", error)
    }
  })

  const {isPending} = mutation;


  function submitForm(e) {
    e.preventDefault();

    if (!form.material || !form.exp || !selectedFile) {
      setError('*กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const formData = new FormData();
    formData.append('material', form.material);
    formData.append('exp', form.exp);
    formData.append('owner', user.id);
    formData.append('image', selectedFile);

    mutation.mutate(formData);
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

            <Input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
            />
          </div>


          <Button
            onClick={submitForm}
            className={`post ${successEffect ? 'success-effect ' : ''}`}
            isLoading={isPending}
          >
            <p className='add-post'>{successEffect ? 'บันทึกสำเร็จ✔️' : 'บันทึก'}</p>
          </Button>



          <p className='alert' >{error}</p>


        </div>

      </div>

    </div>
  )
}

export default AddtoFridge