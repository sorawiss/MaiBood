import React, { use } from 'react'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';

import thaiDate from '../lib/thaiDate.js';
import isExpiringSoon from '../lib/expCheck.js';
import deleteFridgeItem from '../lib/deleteFridgeItem.js';

import ModalCustom from './Modal'


function FridgeList({ material, exp, id }) {
    const [open, setOpen] = useState(false);
    const [sellOpen, setSellOpen] = useState(false);
    const queryClient = useQueryClient();

    const handleOpen = () => setOpen(!open);
    const handleSellOpen = () => setSellOpen(!sellOpen);

    const date = new Date(exp);


    const mutation = useMutation({
        mutationFn: deleteFridgeItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fridge'] });
            console.log('Item deleted successfully')
            setOpen(false);
        },
        onError: (error) => {
            console.error('Error deleting item:', error);
            setOpen(false);
        }
    })


    const handleConfirmDelete = () => {
        mutation.mutate(id);
    };


    return (
        <div className={`fridge-list w-full bg-background px-[1rem] py-[0.5rem] flex justify-between items-center rounded-[16px]
            ${isExpiringSoon(exp) ? 'border-2 border-red-500' : ''}`}>
            {/* Bin SVG */}
            <ModalCustom handleOpen={handleOpen} open={open}
                handler={(
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="#FB4B27" />
                    </svg>)} >

                <div className="modal flex flex-col items-center justify-center 
                    w-full h-screen bg-transparent backdrop-blur-sm "
                    onClick={handleOpen}
                >
                    <div className="modal-container flex flex-col items-center justify-center gap-[1rem]
                         ">
                        <h2>ต้องการลบอาหารออกจากตู้เย็นใช่หรือไม่</h2>
                        <div className="button-wrapper flex gap-[1rem] ">
                            <div className="no bg-secondary rounded-[16px] px-[1rem] py-[0.3rem] "
                                onClick={handleOpen}
                            >ไม่ใช่</div>
                            <div className="ok bg-aceent rounded-[16px] px-[1rem] py-[0.3rem] "
                                onClick={handleConfirmDelete}
                            >ยืนยัน</div>
                        </div>
                    </div>

                </div>
            </ModalCustom>


            <div className="info-wrapper flex flex-col justify-between items-center w-full max-w-[14.37rem] ">
                <h2>{material}</h2>
                <p className='p2 ' >{thaiDate(date)}</p>
            </div>


            <ModalCustom handleOpen={handleSellOpen} open={sellOpen}
                handler={(
                    <div className="sale px-[0.5rem] text-primary  bg-aceent rounded-[1rem] flex justify-center items-center ">
                        <p>ขาย</p>
                    </div>)} >

                <div className="add-wrapper">

                    <div className="sell-fridge">
                        <div className="text-wrapper">
                            <p className='sell'>ขาย</p>
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
                            <div className="add-detail">
                                <input
                                    type="text"
                                    placeholder="ประเภท"
                                    className="category-input"
                                />
                            </div>
                        </div>
                        <div className="price-banner">
                            <input
                                type="text"
                                placeholder="ราคา (ใส่ 0 บาทได้)"
                                className="price-input"
                            />
                        </div>
                        <div className="post">
                            <p className='add-post'>ลงประกาศ</p>
                        </div>
                    </div>

                </div>


            </ModalCustom>






        </div>
    )
}

export default FridgeList