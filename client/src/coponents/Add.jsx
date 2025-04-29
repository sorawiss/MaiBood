import React, { useState, useContext } from 'react'
import '../section/style/Add.css'
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { Input, Button } from "rizzui";
import BackArrow from './BackArrow';
import ModalCustom from './Modal';

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


// ==== Main Function ====
function AddtoFridge() {
  // Variables
  const [error, setError] = useState('')
  const { user } = useContext(AuthContext);
  const [successEffect, setSuccessEffect] = useState(false);
  const [postType, setPostType] = useState('');
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const { search } = useLocation();


  // Get data from URL
  const query = new URLSearchParams(search);
  const id = query.get('id')
  const initialMaterial = query.get('material') || '';
  const initialExp = query.get('exp') || '';

  let dateExp = null
  if (initialExp) {
    dateExp = new Date(initialExp).toISOString().split('T')[0];
  }


  const [form, setForm] = useState({
    material: initialMaterial,
    exp: dateExp,
    price: '',
    selectedFile: null,
  })


  function handleTypeSelect(type) {
    setPostType(type);
    setIsTypeModalOpen(false);
  }




  const handleFileChange = (event) => {
    form.selectedFile = event.target.files[0];
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
      console.log("Add data success", data)
      setError('')
      setForm({
        material: '',
        exp: '',
        price: ''
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

  const { isPending } = mutation;


  function submitForm(e) {
    e.preventDefault();

    if (!form.material || !form.exp || !form.selectedFile) {
      setError('*กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }  

    const formData = new FormData();

    if (id) {
      formData.append('id', id);
    }

    formData.append('material', form.material);
    formData.append('exp', form.exp);
    formData.append('price', form.price);
    formData.append('owner', user.id);
    formData.append('image', form.selectedFile);
    formData.append('type', postType);

    mutation.mutate(formData);
  }




  return (
    <div className='overall min-h-screen bg-white-bg w-full flex px-[2rem] '>
      <BackArrow />

      <div className="add-wrapper">
        <div className="header-title flex flex-col items-center gap-[0.5rem] ">
          <h2 className='text-primary ' >เพิ่มอาหารไปที่ร้านค้า</h2>
          <p className='p2 text-secondary ' >อาหารจะถูกวางขายที่ร้านค้า</p>
        </div>

        {/* <div className="sell-fridge">
          <div className="text-wrapper">
            <p className='sell'>
              <Link to={'/add'}>ขาย</Link></p>
            <p className='fridge'>ใส่ตู้เย็น</p>
          </div>
          <div className="slide-bar" ></div>
        </div> */}

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
                disabled={initialExp}
              />
            </div>

            <div className="add-detail ">
              <Input
                type="text"
                value={postType}
                placeholder="เลือกประเภทโพสต์"
                readOnly
                onClick={() => setIsTypeModalOpen(true)}
                className="cursor-pointer w-full "
              />
            </div>

            <div className="add-detail">
              <Input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
              />
            </div>
            <div className="price-banner">
              <div className="price-input ">
                <Input
                  type="number"
                  value={form.price}
                  placeholder="ราคา (ใส่ 0 บาทได้)"
                  className="price-input "
                  name='price'
                  onChange={handleChange}
                  required
                  autoComplete='off'
                />
              </div>
            </div>

            <Button
              onClick={submitForm}
              className={`post ${successEffect ? 'success-effect ' : ''}`}
              isLoading={isPending}
            >
              <p className='add-post'>{successEffect ? 'บันทึกสำเร็จ✔️' : 'บันทึก'}</p>
            </Button>

          </div>





          <p className='alert' >{error}</p>
          <Link to={'/fridge/add-to-fridge'} className='p2 text-secondary' >ต้องการเพิ่มอาหารเข้าตู้เย็นส่วนตัวกดที่นี่</Link>


          <ModalCustom
            open={isTypeModalOpen}
            handleOpen={() => setIsTypeModalOpen(!isTypeModalOpen)}
            handler={<></>}
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">เลือกประเภท</h2>
              <ul className="space-y-3 text-center ">
                {['เนื้อ', 'ผัก, ผลไม้', 'ขนมปัง', 'อื่น ๆ'].map((type) => (
                  <li
                    key={type}
                    onClick={() => handleTypeSelect(type)}
                    className="cursor-pointer px-4 py-2 hover:bg-primary hover:text-white rounded-md"
                  >
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </ModalCustom>


        </div>

      </div>

    </div>
  )
}

export default AddtoFridge