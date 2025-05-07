import React from 'react';
import styles from '../section/style/EditProfile.module.css';

function EditProfile() {
  return (
    <div className={styles.editProfile}>
      {/* ปุ่มกลับ */}
      <button className={styles.arrowButton}>
        <svg className={styles.arrowIcon}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M12.707 17.293a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L9.414 11H19a1 1 0 110 2H9.414l3.293 3.293a1 1 0 010 1.414z"
          />
        </svg>
      </button>

      {/* avatar */}
      <div className={styles.avatar} />
  
      {/* ฟอร์ม */}
      <div className={styles.formContainer}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="ชื่อ"
        />
        <input
          className={styles.inputField}
          type="text"
          placeholder="นามสกุล"
        />
        <input
          className={styles.inputField}
          type="text"
          placeholder="ที่อยู่"
        />
        <input
          className={styles.inputField}
          type="text"
          placeholder="IG"
        />
        <input
          className={styles.inputField}
          type="text"
          placeholder="Line"
        />

        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${styles.cancelBtn}`}
          >
            ยกเลิก
          </button>
          
          <button
            className={`${styles.button} ${styles.saveBtn}`}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
