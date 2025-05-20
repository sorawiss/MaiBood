import React from "react";
import {
    Dialog,
} from "@material-tailwind/react";


export default function ModalCustom({ children, handleOpen, open }) {
    
    
    return (
        <>
            <Dialog onClick={handleOpen} open={open} handler={handleOpen} className="dialog-wrapper w-screen h-screen bg-transparent
                flex flex-col justify-center items-center backdrop-blur-sm " >
                {children}
            </Dialog>
        </>
    );
}