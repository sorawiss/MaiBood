import React, { use } from 'react'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom'

import thaiDate from '../lib/thaiDate.js';
import isExpiringSoon from '../lib/expCheck.js';
import deleteFridgeItem from '../lib/deleteFridgeItem.js';

import ModalCustom from './Modal'


function FridgeList({ material, exp, id, isStore }) {
    // Variables
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const handleOpen = () => setOpen(!open);
    const date = new Date(exp);
    const query = `?id=${id}&material=${material}&exp=${exp}`


    // Mutation Delete
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


    // Handdle Delete
    const handleConfirmDelete = () => {
        mutation.mutate(id);
    };


    // Haddle Sell
    function handdleSell() {
        navigate(`/add/${query}`)
    }




    return (
        <div className={`fridge-list w-full bg-background px-[1rem] py-[0.5rem] flex justify-between items-center rounded-[16px]
            ${isExpiringSoon(exp) ? 'border-2 border-red-500' : ''}`}>
            {/* Bin SVG */}
            <ModalCustom handleOpen={handleOpen} open={open}
                handler={(
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="#FB4B27" />
                    </svg>)} >

                <div className="modal-container flex flex-col items-center justify-center gap-[1rem] bg-white
                    p-[1rem] rounded-[16px] ml-[2.5rem]
                ">
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


            <div className="info-wrapper flex flex-col justify-between items-center w-full max-w-[12rem] text-center ">
                <h2>{material}</h2>
                <p className='p2 ' >{thaiDate(date)}</p>
            </div>

            <div className={`sale px-[0.5rem] text-primary  bg-aceent ${isStore && 'w-[6rem] bg-secondary '}   
            rounded-[1rem] flex justify-center items-center `}
                onClick={isStore ? null : handdleSell }
            >
                <p>{isStore ? 'ขายแล้ว' : 'ขาย'}</p>
            </div>

        </div>
    )
}

export default FridgeList