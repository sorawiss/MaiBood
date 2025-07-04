import React, { useContext } from 'react'

import { AuthContext } from '../AuthContext'

import BackArrow from '../coponents/BackArrow'

import first from '/imgaes/1.png'
import second from '/imgaes/2.png'
import third from '/imgaes/3.png'
import fourth from '/imgaes/4.png'

function LineGuide() {

    const { user } = useContext(AuthContext)


    return (
        <div className='line-guide-page min-h-screen bg-white-bg w-[23.5rem] mx-auto flex flex-col 
            items-center pt-[2.5rem] px-[2rem] pb-[6rem] gap-[4.5rem] '>
            <BackArrow />


            {/* Header */}
            {/****************************************************/}
            <div className='header flex flex-col items-center gap-[1rem] '>
                {/* Line Logo */}
                <svg width="123" height="122" viewBox="0 0 123 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_211_448)">
                        <path d="M122.216 47.457L122.217 47.4566L122.179 47.1439C122.179 47.1386 122.179 47.1345 122.178 47.1291C122.177 47.1246 122.177 47.1205 122.176 47.1159L122.035 45.9401C122.006 45.7039 121.974 45.4348 121.937 45.1279L121.907 44.8835L121.847 44.8909C120.358 36.4274 116.271 28.3955 109.939 21.5374C103.637 14.7123 95.4498 9.32338 86.2622 5.95337C78.3903 3.06597 70.0379 1.60169 61.4378 1.60169C49.8273 1.60169 38.5513 4.33234 28.8293 9.49823C10.0817 19.4593 -0.975008 37.7687 0.659185 56.1439C1.50508 65.6524 5.23015 74.7034 11.432 82.3194C17.2694 89.4877 25.1659 95.2724 34.2675 99.0481C39.8638 101.369 45.3971 102.463 51.2558 103.621L51.9417 103.757C53.5549 104.077 53.9885 104.515 54.1004 104.689C54.3074 105.011 54.1992 105.647 54.1161 105.997C54.0395 106.32 53.9605 106.642 53.8815 106.965C53.2525 109.53 52.602 112.183 53.113 115.108C53.7005 118.47 55.8 120.398 58.8734 120.399H58.8742C62.1801 120.399 65.9426 118.181 68.4321 116.714L68.7646 116.519C74.7039 113.03 80.2994 109.096 84.5103 106.058C93.7251 99.4097 104.17 91.874 112 82.1252C119.885 72.3065 123.599 59.6892 122.216 47.457ZM38.4925 66.0593H27.9673C26.3767 66.0593 25.0873 64.7699 25.0873 63.1793V41.0873C25.0873 39.4967 26.3767 38.2073 27.9673 38.2073C29.5579 38.2073 30.8473 39.4967 30.8473 41.0873V60.2993H38.4921C40.0827 60.2993 41.3721 61.5888 41.3721 63.1793C41.3725 64.7699 40.0831 66.0593 38.4925 66.0593ZM49.4723 63.1012C49.4723 64.6917 48.1829 65.9812 46.5923 65.9812C45.0017 65.9812 43.7123 64.6917 43.7123 63.1012V41.0091C43.7123 39.4185 45.0017 38.1291 46.5923 38.1291C48.1829 38.1291 49.4723 39.4185 49.4723 41.0091V63.1012ZM75.505 63.1012C75.505 64.349 74.7015 65.4549 73.5145 65.8405C73.2216 65.9355 72.9216 65.9816 72.6254 65.9816C71.7207 65.9816 70.8468 65.5541 70.2943 64.7934L59.9234 50.5098V63.1016C59.9234 64.6922 58.634 65.9816 57.0434 65.9816C55.4528 65.9816 54.1634 64.6922 54.1634 63.1016V41.6415C54.1634 40.3936 54.9669 39.2877 56.1539 38.9022C57.3413 38.5171 58.641 38.9392 59.3741 39.9493L69.745 54.2328V41.0091C69.745 39.4185 71.0344 38.1291 72.625 38.1291C74.2156 38.1291 75.505 39.4185 75.505 41.0091V63.1012ZM96.4907 65.5278H82.2368C80.6462 65.5278 79.3568 64.2383 79.3568 62.6478V51.6022V40.5557C79.3568 38.9651 80.6462 37.6757 82.2368 37.6757H96.0484C97.639 37.6757 98.9284 38.9651 98.9284 40.5557C98.9284 42.1463 97.639 43.4357 96.0484 43.4357H85.1168V48.7222H93.988C95.5786 48.7222 96.868 50.0116 96.868 51.6022C96.868 53.1927 95.5786 54.4821 93.988 54.4821H85.1168V59.7678H96.4907C98.0813 59.7678 99.3707 61.0572 99.3707 62.6478C99.3707 64.2383 98.0813 65.5278 96.4907 65.5278Z" fill="#FCDB29" />
                    </g>
                    <defs>
                        <clipPath id="clip0_211_448">
                            <rect width="122" height="122" fill="white" transform="translate(0.5)" />
                        </clipPath>
                    </defs>
                </svg>

                <div className="text-header-wrapper flex flex-col items-center">
                    <h1 className='text-center' >เชื่อมต่อเพื่อรับการแจ้งเตือนผ่านไลน์ได้ง่าย ๆ</h1>
                    <p className='p2 text-center text-secondary' >เชื่อมต่อกับไลน์เพื่อรับการแจ้งเตือนเมื่ออาหารในตู้เย็นใกล้หมดอายุ</p>
                </div>
            </div>


            {/* 1 */}
            {/****************************************************/}
            <a href='https://line.me/R/ti/p/%40750oenhz' className='flex flex-col items-center gap-[1rem] '>
                <p className='text-center text-primary' >1. เพิ่มเพื่อน @750oenhz (มี @ ด้วยนะ)</p>
                <img src={first} alt="เพิ่มเพื่อน @750oenhz (มี @ ด้วยนะ)" />
            </a>

            {/* 2 */}
            {/****************************************************/}
            <div className='flex flex-col items-center gap-[1rem] '>
                <p className='text-center text-primary' >2. ทักเข้าไปว่า “ล็อคอิน”</p>
                <img src={second} alt="ทักเข้าไปว่า “ล็อคอิน”" />
            </div>

            {/* 3 */}
            {/****************************************************/}
            <div className='flex flex-col items-center gap-[1rem] '>
                <p className='text-center text-primary' >3. กรอกไอดีและรหัสผ่าน</p>
                <div className="text-highlight-wrapper bg-aceent p-[0.5rem] ">
                    <h2>ไอดีของคุณคือ</h2>
                </div>
                <h1 className='text-primary !text-[4rem]' >{user.id}</h1>
                <img src={third} alt="กรอกไอดีและรหัสผ่าน" />
            </div>

            {/* 4 */}
            {/****************************************************/}
            <div className='flex flex-col items-center gap-[1rem] '>
                <p className='text-center text-primary' >4. กดเชื่อมต่อ</p>
                <img src={fourth} alt="กดเชื่อมต่อ" />
            </div>

            <h1 className='text-center text-primary' >การแจ้งเตือนผ่านไลน์พร้อมใช้งาน 🎉🎉</h1>

        </div>
    )
}

export default LineGuide