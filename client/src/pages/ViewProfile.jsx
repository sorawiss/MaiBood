import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import Loading from '../coponents/Loading'
import { useParams, Link } from 'react-router-dom'
import { getImageUrl } from '../lib/imageUtils'

import BackArrow from '../coponents/BackArrow'
import profile from '/svg/profile.svg'
import Noodle from '../assets/Group.svg'
import line from '../assets/line 1.svg'

import getHistory from '../lib/getHistory'
import { AuthContext } from '../AuthContext'

// Fetch User Data
const baseURL = import.meta.env.VITE_BASE_URL;
async function fetchUserData(id) {
    const response = await fetch(`${baseURL}/get-profile/${id}`)
    const data = await response.json()
    return data
}


function ViewProfile() {

    const { id } = useParams()
    // Query User Data
    const { data: user, isPending, isError, error } = useQuery({
        queryKey: ['user-data', id],
        queryFn: async () => {
            const userData = await fetchUserData(id);
            const history = await getHistory(id);
            return { ...userData, ...history };
        },
        staleTime: 0,
        cacheTime: 0
    })

    if (isPending) return <div><Loading /></div>
    if (isError) return <div>Error: {error.message}</div>


    // Rank System
    let rank;
    if (user.givenCount > 20) {
        rank = '👑 พระราชา'
    } else if (user.givenCount >= 10) {
        rank = '⚜️ ลอร์ด'
    } else if (user.givenCount >= 5) {
        rank = '♞ อัศวิน'
    } else {
        rank = '👨🏻‍🌾 ชาวบ้าน'
    }

    console.log(user)


    return (
        <div>
            <div className="profile-page-wrapper">
                <div className='profile-page min-h-screen bg-white-bg w-[23.5rem] mx-auto flex flex-col items-center py-[2.5rem] px-[2rem] gap-[4.5rem] '>
                    <BackArrow path={'/home'} />

                    <div className="profile-detail-wrapper gap-[2.5rem] ">

                        <div className="profile-pic-name gap-[1rem] ">
                            <img 
                                src={getImageUrl(user.pic) || profile} 
                                alt="profile" 
                                className='size-[10.75rem] rounded-full border-2 border-aceent' 
                            />
                            <div className="name-rank flex flex-col items-center ">
                                <h2 className='prim-text'>{user.fname} {user.lname}</h2>
                                <div className="rank-banner flex flex-col items-center ">
                                    <p className='sec-text'>{rank}</p>
                                </div>
                            </div>
                        </div>

                        <div className="success-feedback">
                            <div className="success-text">
                                <h2 className='prim-text'>{rank}</h2>
                                <p className='prim-text'>{user.fname} ได้ช่วยให้อาหารกว่า {user.givenCount + user.eatCount} มื้อ
                                    ไม่เน่าเสียอย่างไร้คุณค่า</p>
                            </div>
                            <img src={Noodle} />
                        </div>

                        <div className="small-detail-wrapper flex flex-col items-center gap-[1rem] w-full ">
                            <div className="sell-number flex flex-col items-center gap-[1rem] ">
                                <div className="sellnum-banner flex flex-row ">
                                    <p className='prim-text'>แบ่งปันไปทั้งหมด</p>
                                    <h2 className='prim-text'>{user.givenCount} ครั้ง</h2>
                                </div>
                            </div>

                            <div className="sell-number flex flex-col items-center gap-[1rem] ">
                                <div className="sellnum-banner flex flex-row ">
                                    <p className='prim-text'>ทานอาหารหมดก่อนหมดอายุ</p>
                                    <h2 className='prim-text'>{user.eatCount} ครั้ง</h2>
                                </div>
                            </div>

                            <div className="sell-number flex flex-col items-center gap-[1rem] ">
                                <div className="sellnum-banner flex flex-row ">
                                    <p className='prim-text'>ทำอาหารบูดไปทั้งหมด</p>
                                    <h2 className='prim-text'>{user.expiredCount} ครั้ง</h2>
                                </div>
                            </div>
                        </div>



                        {/* Contact Wrapper */}
                        {/* ************************************************* */}
                        <div className="contact-wrapper flex flex-col gap-[1rem] ">

                            {/* Address */}
                            <div className="address-wrapper bg-background rounded-[16px] p-[1rem] ">
                                <p className='con-tect p2 text-center '><b  >{user.address}</b> ตำบล {user.subdistrict}
                                    อำเภอ {user.district} จังหวัด {user.province} รหัสไปรษณีย์ {user.zip_code} </p>
                            </div>

                            {/* Line And Instagram */}
                            <div className="contact-in-profile ">
                                <div className="contact-profilepage flex flex-row ">

                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_3_5756)">
                                            <path d="M7.00226 0.321411C4.08565 0.321411 3.23266 0.324432 3.06685 0.338241C2.46832 0.388192 2.09587 0.482808 1.69011 0.685633C1.37741 0.841527 1.1308 1.02224 0.887406 1.27555C0.444145 1.73752 0.175502 2.30586 0.0782537 2.98144C0.0309725 3.30941 0.017218 3.3763 0.0144241 5.05154C0.0133495 5.60996 0.0144241 6.34488 0.0144241 7.33063C0.0144241 10.2565 0.0176478 11.112 0.0316173 11.2782C0.079973 11.8629 0.171312 12.2308 0.364735 12.6332C0.734387 13.4035 1.44038 13.9818 2.2721 14.1975C2.56009 14.272 2.87816 14.313 3.2865 14.3324C3.4595 14.3399 5.22287 14.3453 6.98732 14.3453C8.75177 14.3453 10.5162 14.3432 10.6849 14.3346C11.1577 14.3122 11.4323 14.2752 11.7359 14.1965C12.1483 14.0903 12.5326 13.895 12.862 13.6242C13.1915 13.3535 13.4581 13.0138 13.6432 12.6289C13.8329 12.2362 13.9291 11.8543 13.9726 11.3001C13.982 11.1792 13.986 9.25272 13.986 7.32879C13.986 5.40455 13.9817 3.48159 13.9723 3.36076C13.9282 2.7976 13.832 2.41892 13.6362 2.01867C13.4756 1.69102 13.2972 1.44633 13.0382 1.19615C12.5762 0.752953 12.0109 0.483239 11.3373 0.385711C11.0109 0.338349 10.9459 0.324324 9.27605 0.321411H7.00226Z" fill="url(#paint0_radial_3_5756)" />
                                            <path d="M7.00226 0.321411C4.08565 0.321411 3.23266 0.324432 3.06685 0.338241C2.46832 0.388192 2.09587 0.482808 1.69011 0.685633C1.37741 0.841527 1.1308 1.02224 0.887406 1.27555C0.444145 1.73752 0.175502 2.30586 0.0782537 2.98144C0.0309725 3.30941 0.017218 3.3763 0.0144241 5.05154C0.0133495 5.60996 0.0144241 6.34488 0.0144241 7.33063C0.0144241 10.2565 0.0176478 11.112 0.0316173 11.2782C0.079973 11.8629 0.171312 12.2308 0.364735 12.6332C0.734387 13.4035 1.44038 13.9818 2.2721 14.1975C2.56009 14.272 2.87816 14.313 3.2865 14.3324C3.4595 14.3399 5.22287 14.3453 6.98732 14.3453C8.75177 14.3453 10.5162 14.3432 10.6849 14.3346C11.1577 14.3122 11.4323 14.2752 11.7359 14.1965C12.1483 14.0903 12.5326 13.895 12.862 13.6242C13.1915 13.3535 13.4581 13.0138 13.6432 12.6289C13.8329 12.2362 13.9291 11.8543 13.9726 11.3001C13.982 11.1792 13.986 9.25272 13.986 7.32879C13.986 5.40455 13.9817 3.48159 13.9723 3.36076C13.9282 2.7976 13.832 2.41892 13.6362 2.01867C13.4756 1.69102 13.2972 1.44633 13.0382 1.19615C12.5762 0.752953 12.0109 0.483239 11.3373 0.385711C11.0109 0.338349 10.9459 0.324324 9.27605 0.321411H7.00226Z" fill="url(#paint1_radial_3_5756)" />
                                            <path d="M6.99903 2.15546C5.59822 2.15546 5.42242 2.16161 4.87223 2.18674C4.32313 2.21199 3.94832 2.29927 3.62036 2.42733C3.28112 2.5596 2.99335 2.73653 2.70665 3.02447C2.41974 3.31231 2.24351 3.60123 2.11134 3.94172C1.98346 4.27109 1.89642 4.6475 1.87171 5.19858C1.84721 5.75096 1.84076 5.92757 1.84076 7.33396C1.84076 8.74036 1.84699 8.91632 1.87192 9.46869C1.89717 10.02 1.98411 10.3963 2.11155 10.7256C2.2434 11.0662 2.41963 11.3551 2.70643 11.6429C2.99302 11.931 3.28079 12.1083 3.61982 12.2406C3.94799 12.3687 4.32291 12.4559 4.87191 12.4812C5.42209 12.5063 5.59779 12.5125 6.99849 12.5125C8.39941 12.5125 8.57467 12.5063 9.12485 12.4812C9.67396 12.4559 10.0492 12.3687 10.3774 12.2406C10.7165 12.1083 11.0038 11.931 11.2904 11.6429C11.5773 11.3551 11.7536 11.0662 11.8858 10.7257C12.0126 10.3963 12.0996 10.0199 12.1254 9.4688C12.1501 8.91643 12.1565 8.74036 12.1565 7.33396C12.1565 5.92757 12.1501 5.75107 12.1254 5.19869C12.0996 4.6474 12.0126 4.27109 11.8858 3.94183C11.7536 3.60123 11.5773 3.31231 11.2904 3.02447C11.0035 2.73642 10.7166 2.55949 10.3771 2.42733C10.0482 2.29927 9.67321 2.21199 9.1241 2.18674C8.57392 2.16161 8.39877 2.15546 6.99752 2.15546H6.99903ZM6.53632 3.08867C6.67365 3.08845 6.82688 3.08867 6.99903 3.08867C8.3762 3.08867 8.53943 3.09363 9.08327 3.11844C9.58617 3.14153 9.85911 3.2259 10.0409 3.29678C10.2816 3.39064 10.4532 3.50284 10.6337 3.68409C10.8142 3.86533 10.9259 4.03795 11.0196 4.27961C11.0902 4.46194 11.1744 4.73597 11.1973 5.24088C11.222 5.78678 11.2274 5.95076 11.2274 7.33278C11.2274 8.71479 11.222 8.87878 11.1973 9.42468C11.1743 9.92958 11.0902 10.2036 11.0196 10.3859C10.9262 10.6276 10.8142 10.7997 10.6337 10.9808C10.4531 11.1621 10.2817 11.2743 10.0409 11.3681C9.85932 11.4393 9.58617 11.5235 9.08327 11.5466C8.53953 11.5714 8.3762 11.5768 6.99903 11.5768C5.62175 11.5768 5.45852 11.5714 4.91479 11.5466C4.41189 11.5233 4.13895 11.4389 3.95702 11.368C3.71632 11.2742 3.54439 11.162 3.36386 10.9807C3.18333 10.7995 3.07157 10.6273 2.97787 10.3855C2.90727 10.2032 2.82313 9.92915 2.80024 9.42424C2.77553 8.87834 2.77059 8.71436 2.77059 7.33148C2.77059 5.9486 2.77553 5.78548 2.80024 5.23958C2.82324 4.73468 2.90727 4.46065 2.97787 4.2781C3.07136 4.03644 3.18333 3.86382 3.36386 3.68258C3.54439 3.50133 3.71632 3.38913 3.95702 3.29505C4.13884 3.22385 4.41189 3.1397 4.91479 3.1165C5.39061 3.09492 5.575 3.08845 6.53632 3.08737V3.08867ZM9.7523 3.94851C9.62987 3.94851 9.51019 3.98497 9.4084 4.05326C9.30661 4.12155 9.22728 4.21861 9.18044 4.33218C9.1336 4.44574 9.12135 4.5707 9.14525 4.69125C9.16915 4.8118 9.22812 4.92252 9.31471 5.00942C9.40129 5.09632 9.5116 5.15549 9.63168 5.17944C9.75175 5.20339 9.87621 5.19106 9.98931 5.14399C10.1024 5.09692 10.1991 5.01724 10.267 4.91502C10.335 4.8128 10.3713 4.69263 10.3713 4.56972C10.3713 4.22664 10.094 3.9483 9.7523 3.9483V3.94851ZM6.99903 4.67458C5.53621 4.67458 4.35021 5.86532 4.35021 7.33396C4.35021 8.80261 5.53621 9.9928 6.99903 9.9928C8.46184 9.9928 9.64753 8.80261 9.64753 7.33396C9.64753 5.86532 8.46184 4.67458 6.99903 4.67458ZM6.99903 5.60779C7.94852 5.60779 8.71834 6.38058 8.71834 7.33396C8.71834 8.28724 7.94852 9.06013 6.99903 9.06013C6.04943 9.06013 5.27971 8.28724 5.27971 7.33396C5.27971 6.38058 6.04943 5.60779 6.99903 5.60779Z" fill="white" />
                                        </g>
                                        <defs>
                                            <radialGradient id="paint0_radial_3_5756" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.72529 15.4255) rotate(-90) scale(13.8988 12.8791)">
                                                <stop stopColor="#FFDD55" />
                                                <stop offset="0.1" stopColor="#FFDD55" />
                                                <stop offset="0.5" stopColor="#FF543E" />
                                                <stop offset="1" stopColor="#C837AB" />
                                            </radialGradient>
                                            <radialGradient id="paint1_radial_3_5756" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-2.32645 1.33167) rotate(78.7214) scale(6.21192 25.5183)">
                                                <stop stopColor="#3771C8" />
                                                <stop offset="0.128" stopColor="#3771C8" />
                                                <stop offset="1" stopColor="#6600FF" stopOpacity="0" />
                                            </radialGradient>
                                            <clipPath id="clip0_3_5756">
                                                <rect width="14" height="14" fill="white" transform="translate(0 0.333374)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <p className='con-tect p2'>{user.ig ? user.ig : '-'}</p>
                                </div>

                                <div className="contact-profilepage flex flex-row">
                                    <img src={line} alt='line'></img>
                                    <p className='con-tect p2'> {user.line ? user.line : '-'} </p>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProfile