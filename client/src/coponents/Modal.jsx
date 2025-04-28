import React from "react";
import {
    Button,
    Dialog,
} from "@material-tailwind/react";


export default function ModalCustom({ children, handler, handleOpen, open }) {
    
    

    return (
        <>
            <Button onClick={handleOpen} variant="gradient">
                {handler}
            </Button>
            <Dialog open={open} handler={handleOpen} className="bg-transparent " >
                {children}
            </Dialog>
        </>
    );
}