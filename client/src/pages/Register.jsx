import React from 'react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom';

import { Button } from "rizzui";


const baseURL = import.meta.env.VITE_BASE_URL;
async function fetchRegister(data) {
    const response = await fetch(`${baseURL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    return response.json
}


function Login() {
    // Vaiables
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        phone_number: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();


    // Handle Change
    function handleChange(e) {
        const { name, value} = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    // Handle Submit
    function handleSubmit(e) {
        e.preventDefault()

        const dataToSend = {
            fname: formData.fname,
            lname: formData.lname,
            phone_number: String(formData.phone_number),
            password: formData.password
        };

        mutation.mutate(dataToSend)
    }


    // Use Mutation
    const mutation = useMutation({
        mutationFn: fetchRegister,
        onSuccess: (data) => {
            console.log("Register Success", data)
            navigate('/home')
        },
        onError: (error) => {
            console.log("Register Error", error)
        }
    })

    return (
        <main className="max-w-none flex flex-col items-center justify-end w-full h-screen bg-[#FCDB29] box-border mx-auto pt-[270px] max-md:max-w-[991px] max-sm:max-w-screen-sm">
            <div className="font-bold text-[40px] text-[#34332F] w-[360px] text-center mb-[146px] max-md:text-4xl max-sm:text-[32px]">
                "ไม่บูด เพื่อคุณ ชุมชนและสังคม"
            </div>
            <section className="w-full bg-white box-border px-[26px] py-[58px] rounded-[48px_48px_0_0]">
                <form className="w-full">
                    <h1 className="font-bold text-[40px] text-[#34332F] text-center mb-6 max-md:text-4xl max-sm:text-[32px]">
                        เข้าสู่ะระบบ
                    </h1>

                    <div className="flex flex-col gap-4 mb-6">
                        <div className="relative">
                            <input
                                name="fname"
                                onChange={handleChange}
                                type="text"
                                placeholder="ชื่อ"
                                className="font-bold text-xl text-[#9A9A9A] w-full bg-[#F6F6F6] px-[13px] py-1.5 rounded-2xl max-md:text-lg max-sm:text-base outline-none"
                            />
                        </div>

                        <div className="relative">
                            <input
                                name="lname"
                                onChange={handleChange}
                                type="text"
                                placeholder="นามสกุล"
                                className="font-bold text-xl text-[#9A9A9A] w-full bg-[#F6F6F6] px-[13px] py-1.5 rounded-2xl max-md:text-lg max-sm:text-base outline-none"
                            />
                        </div>

                        <div className="relative">
                            <input
                                name="phone_number"
                                onChange={handleChange}
                                type="tel"
                                placeholder="เบอร์โทรศัพท์"
                                className="font-bold text-xl text-[#9A9A9A] w-full bg-[#F6F6F6] px-[13px] py-1.5 rounded-2xl max-md:text-lg max-sm:text-base outline-none"
                                required
                            />
                        </div>

                        <div className="relative">
                            <input
                                name="password"
                                onChange={handleChange}
                                type="password"
                                placeholder="รหัสผ่าน"
                                className="font-bold text-xl text-[#9A9A9A] w-full bg-[#F6F6F6] px-[13px] py-1.5 rounded-2xl max-md:text-lg max-sm:text-base outline-none"
                            />
                        </div>

                        <div className="relative">
                            <input
                                onChange={(e) => {
                                    if(e.target.value != formData.password ) {
                                        setErrorMessage('*รหัสผ่านไม่ตรงกัน')
                                    } else {
                                        setErrorMessage('')
                                    }
                                }}
                                type="password"
                                placeholder="ยืนยันรหัสผ่าน"
                                className="font-bold text-xl text-[#9A9A9A] w-full bg-[#F6F6F6] px-[13px] py-1.5 rounded-2xl max-md:text-lg max-sm:text-base outline-none"
                            />
                        </div>
                    </div>

                    <p className='alert ' >{errorMessage}</p>

                    <Button className="font-bold text-xl text-[#34332F] w-full bg-[#FCDB29] px-0 py-2 rounded-2xl 
                        max-md:text-lg max-sm:text-base hover:bg-[#e6c725] transition-colors disabled:bg-secondary " 
                        disabled={errorMessage.length > 0}
                        onClick={handleSubmit}
                        >
                            ลงทะเบียน
                        </Button>
                </form>


                <p className='mt-[1rem] ' >หากมีบัญชีอยู่แล้ว<a href=""> เข้าสู่ระบบ</a></p>


            </section>
        </main>

    )
}

export default Login