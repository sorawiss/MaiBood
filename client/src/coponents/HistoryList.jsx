import React from 'react'

function HistoryList({ material, expireDate, status }) {
  const date = new Date(expireDate)

  switch (status) {
    case 2:
      status = 'กินเอง'
      break
    case 3:
      status = 'แบ่งปัน'
      break
    case 4:
      status = 'หมดอายุ'
      break
  }


  return (
    <div className={`history-list-container w-full ${status === 'กินเอง' ? 'bg-background text-primary' :
      status === 'แบ่งปัน' ? 'bg-aceent text-primary' :
        status === 'หมดอายุ' ? 'bg-alert text-background ' :
          'bg-background'
      } rounded-[16px] flex flex-col items-center justify-center`} >
      <h2>{material}</h2>
      <div className={`detail-wrapper flex flex-col items-center justify-center
         ${status == 'หมดอายุ' ? 'text-background' : 'text-secondary '} `}>
        <p className='p2' >หมดอายุเมื่อ {date.toLocaleDateString('th-TH',
          { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p className='p2' >{status}</p>
      </div>



    </div>
  )
}

export default HistoryList