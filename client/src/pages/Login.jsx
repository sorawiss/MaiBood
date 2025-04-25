import React from 'react'

function Login() {
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
                                type="tel"
                                placeholder="เบอร์โทรศัพท์"
                                className="font-bold text-xl text-[#9A9A9A] w-full bg-[#F6F6F6] px-[13px] py-1.5 rounded-2xl max-md:text-lg max-sm:text-base outline-none"
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="password"
                                placeholder="รหัสผ่าน"
                                className="font-bold text-xl text-[#9A9A9A] w-full bg-[#F6F6F6] px-[13px] py-1.5 rounded-2xl max-md:text-lg max-sm:text-base outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="font-bold text-xl text-[#34332F] w-full bg-[#FCDB29] px-0 py-2 rounded-2xl max-md:text-lg max-sm:text-base hover:bg-[#e6c725] transition-colors"
                    >
                        เข้าสู่ระบบ
                    </button>
                </form>


                <p className='mt-[1rem] ' >หากมีบัญชีอยู่แล้ว<a href=""> เข้าสู่ระบบ</a></p> 


            </section>
        </main>

    )
}

export default Login