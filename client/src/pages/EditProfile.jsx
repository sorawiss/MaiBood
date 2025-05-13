import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../AuthContext';
import styles from '../section/style/EditProfile.module.css';

import BackArrow from '../coponents/BackArrow';
import CustomButton from '../coponents/CustomButton';

// Edit Profile Function
const baseURL = import.meta.env.VITE_BASE_URL;

async function updateProfile(data) {
  const response = await fetch(`${baseURL}/edit-profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update profile');
  }

  return await response.json();
}

function EditProfile() {
  const { user, refreshUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    address: '',
    zip_code: '',
    ig: '',
    line: ''
  });
  const [error, setError] = useState('');

  // Check for returned image URL from crop page
  useEffect(() => {
    if (location.state?.uploadedImageUrl) {
      refreshUser();
    }
  }, [location.state, refreshUser]);

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        fname: user.fname || '',
        lname: user.lname || '',
        address: user.address || '',
        zip_code: user.zip_code || '',
        ig: user.ig || '',
        line: user.line || ''
      });
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      console.log('Profile updated successfully', data);
      refreshUser();
      navigate('/profile');
    },
    onError: (error) => {
      console.error('Failed to update profile:', error);
      setError(error.message);
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        // Navigate to crop page with image data
        navigate('/crop-image', {
          state: {
            imageSrc: reader.result,
            returnUrl: '/edit-profile',
            uploadEndpoint: '/api/profile-image'
          }
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.editProfile}>
      <div className="arrow py-[2.5rem] ">
        <BackArrow />
      </div>

      {/* Avatar upload */}
      <div className={`${styles.avatar} profile relative group cursor-pointer`}>
        {user?.pic && (
          <img 
            src={user.pic} 
            alt="Profile" 
            className="w-full h-full object-cover rounded-full"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-full flex items-center justify-center">
          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Change Photo
          </span>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="absolute inset-0 opacity-0 cursor-pointer"
          title="Click to upload profile picture"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="text-red-500 mb-4 text-center">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="ชื่อ"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
        />
        <input
          className={styles.inputField}
          type="text"
          placeholder="นามสกุล"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
        />
        <input
          className={styles.inputField}
          type="text"
          placeholder="ที่อยู่"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          className={styles.inputField}
          type="text"
          placeholder="รหัสไปรษณีย์"
          name="zip_code"
          value={formData.zip_code}
          onChange={handleChange}
        />
        <input
          className={styles.inputField}
          type="text"
          placeholder="IG"
          name="ig"
          value={formData.ig}
          onChange={handleChange}
        />
        <input
          className={styles.inputField}
          type="text"
          placeholder="Line"
          name="line"
          value={formData.line}
          onChange={handleChange}
        />

        <div className={styles.buttons}>
          <button
            type="button"
            className={`${styles.button} ${styles.cancelBtn}`}
            onClick={handleCancel}
            disabled={mutation.isPending}
          >
            ยกเลิก
          </button>
          
          <CustomButton
            type="submit"
            className={`${styles.button} ${styles.saveBtn}`}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'กำลังบันทึก...' : 'บันทึก'}
          </CustomButton>

        </div>
      </form>
    </div>
  );
}

export default EditProfile;
