import React, { useState, useContext } from 'react'
import '../section/style/Add.css'
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Button from '../coponents/CustomButton';
import BackArrow from './BackArrow';
import ModalCustom from './Modal';
import imageCompression from 'browser-image-compression';

import { AuthContext } from '../AuthContext';


// Fetch API function 
const baseUrl = import.meta.env.VITE_BASE_URL;
async function fetchAddFridge(formData) {
  const response = await fetch(`${baseUrl}/upload`, {
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
  const [postType, setPostType] = useState(null);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const { search } = useLocation();


  // Type of Post
  const typeOfPost = [
    { label: "เนื้อ", value: 1 },
    { label: "ผัก, ผลไม้", value: 2 },
    { label: "ขนม", value: 3 },
    { label: "อื่น ๆ", value: 4 }
  ]


  // Get Information from URL (for sell from fridge)
  const query = new URLSearchParams(search);
  const id = query.get('id')
  const initialMaterial = query.get('material') || '';
  const initialExp = query.get('exp') || '';

  let dateExp = ''
  if (initialExp) {
    dateExp = new Date(initialExp).toISOString().split('T')[0];
  }


  const [form, setForm] = useState({
    material: initialMaterial,
    exp: dateExp,
    selectedFile: null,
  })


  // Type Handler
  function handleTypeSelect(type) {
    setPostType(type);
    setIsTypeModalOpen(false);
  }


  // File Handler
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Get the original file extension
    const ext = file.name.split('.').pop().toLowerCase();
    
    // Option of compression-image
    const options = {
        maxSizeMB: 0.1, // target maximum size in MB
        maxWidthOrHeight: 1024, // maintain aspect ratio
        useWebWorker: true,
        fileType: `image/${ext === 'jpg' ? 'jpeg' : ext}`, // Set correct MIME type
    };

    // Compression Function
    try {
        const compressedFile = await imageCompression(file, options);
        // Create a new file with the original extension
        const compressedFileWithExt = new File(
            [compressedFile], 
            `compressed-${Date.now()}.${ext}`, 
            { type: `image/${ext === 'jpg' ? 'jpeg' : ext}` }
        );
        
        setForm({
            ...form,
            selectedFile: compressedFileWithExt,
        });
    } catch (error) {
        console.error('Image compression error:', error);
        setForm({
            ...form,
            selectedFile: null,
        });
    }
  };


  // Form Handler
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
      setPostType(null)
      setForm({
        material: '',
        exp: '',
        selectedFile: null,
      })

      setSuccessEffect(true);
      setTimeout(() => {
        setSuccessEffect(false);
      }, 2000);
    },
    onError: (error) => {
      console.log("Add fridge error", error)
    }
  })

  const { isPending } = mutation;



  // Submit Form
  //----------------------------//
  function submitForm(e) {
    e.preventDefault();

    if (!form.material || !form.exp || !form.selectedFile || !postType) {
      setError('*กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (form.exp < new Date().toISOString().split('T')[0]) {
      setError('ไม่แจกอาหารที่บูดแล้วนะครับ 🙂');
      return;
    }

    const formData = new FormData();

    if (id) {
      formData.append('id', id);
    }

    formData.append('material', form.material);
    formData.append('exp', form.exp);
    formData.append('price', 0);
    formData.append('owner', user.id);
    formData.append('image', form.selectedFile);
    formData.append('type', postType.value);

    mutation.mutate(formData);
  }




  return (
    <div className='overall min-h-screen bg-white-bg w-full flex px-[2rem] '>
      <BackArrow />

      <div className="add-wrapper">
        <div className="header-title flex flex-col items-center gap-[0.5rem] ">
          <h2 className='text-primary ' >แจกอาหารให้กับชุมชน</h2>
          <p className='p2 text-secondary ' >อาหารจะถูกแจกจ่ายให้กับชุมชนของคุณ</p>
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
            <div className="add-detail ">
              <input
                type="date"
                name='exp'
                value={form.exp}
                onChange={handleChange}
                required
                autoComplete='off'
                className="w-full text-secondary "
                disabled={initialExp}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="add-detail ">
              <input
                type="text"
                value={postType ? postType.label : ''}
                placeholder="เลือกประเภทโพสต์"
                readOnly
                onClick={() => setIsTypeModalOpen(true)}
                className="cursor-pointer w-full "
              />
            </div>

            <div className="add-detail w-full ">
              <label>
                <input
                  type='file'
                  accept='image/*'
                  capture="environment"
                  onChange={handleFileChange}
                  className="hidden "
                />
                <span className="text-primary hover:text-black w-full ">ถ่ายรูปอาหาร</span>
              </label>
            </div>


            <div className="image-uploaded-display w-full ">
              <img src={form.selectedFile ? URL.createObjectURL(form.selectedFile) : null} alt="" />
            </div>

            <Button
              onClick={submitForm}
              className={`post ${successEffect ? 'success-effect ' : ''}`}
              isLoading={isPending}
            >
              {successEffect ? "แบ่งปันสำเร็จ ✔️" : "แบ่งปัน 🎁"}
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
                {typeOfPost.map((type) => (
                  <li
                    key={type.value}
                    onClick={() => handleTypeSelect(type)}
                    className="cursor-pointer px-4 py-2 hover:bg-primary hover:text-white rounded-md"
                  >
                    {type.label}
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