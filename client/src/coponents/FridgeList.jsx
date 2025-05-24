import React, { use } from 'react'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'

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
    //----------------------------//
    const handleSuccess = async () => {
        try {
            // Invalidate queries and wait for it to complete
            await queryClient.invalidateQueries({ queryKey: ['fridge'] });
            // Only close the modal after invalidation is complete
            setOpen(false);
        } catch (error) {
            console.error('Error invalidating queries:', error);
        }
    };
    const mutation = useMutation({
        mutationFn: deleteFridgeItem,
        onSuccess: handleSuccess,
        onError: (error) => {
            console.error('Error:', error);
        }
    })
    //----------------------------//


    // Handdle Delete
    const handleConfirmDelete = () => {
        mutation.mutate(id);
    };
    // Haddle Sell
    function handdleSell() {
        navigate(`/add/${query}`)
    }


    // Style for state of button
    //----------------------------//
    const expireStyle = () => {
        const expDate = isExpiringSoon(exp);

        switch (expDate) {
            case 1: return "border border-3 border-red-500"
            case 2: return "bg-secondary "
            default: return ""

        }
    }




    return (
        <div className={`fridge-list w-full bg-background px-[1rem] py-[0.5rem] flex justify-between 
            items-center rounded-[16px] ${expireStyle()} transition-all duration-300 ease-in-out`}

        >
            {/* Bin SVG */}
            <p className='cursor-pointer'
                onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                }}
            >😋</p>

            <ModalCustom handleOpen={handleOpen} open={open}>
                <div className="modal-container flex flex-col items-center justify-center gap-[1rem] bg-white
                    p-[1rem] rounded-[16px] ml-[2.5rem]">
                    <div className="modal-container flex flex-col items-center justify-center gap-[1rem]
                         ">
                        <h2>นำอาหารออกจากตู้เย็น</h2>
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
                <h2 onClick={() => {
                    if (isStore === 1) {
                        navigate('/home/inpost/' + id);
                    }
                }} >
                    {material}</h2>
                <p className='p2 ' >{thaiDate(date)}</p>
            </div>

            <div className={`sale px-[0.5rem] text-primary  bg-aceent ${isStore && 'w-[6rem] bg-secondary '}   
            rounded-[1rem] flex justify-center items-center `}
                onClick={isStore ? null : handdleSell}
            >
                {isExpiringSoon(exp) != 2 && <p>{isStore ? 'แจกอยู่' : 'แบ่งปัน'}</p>}

            </div>

        </div>
    )
}

export default FridgeList