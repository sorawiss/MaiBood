import React from 'react';
import styles from '../section/style/EditProfile.module.css';

function EditProfile() {
  return (
    <div className={styles.editProfile}>
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
