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
    default:
      status = 'หมดอายุ'
      break
  }


  return (
    <div className={`history-list-container w-full ${status === 'กินเอง' ? 'bg-background' : 'bg-aceent'} rounded-[16px]  flex flex-col items-center justify-center`} >
      <h2>{material}</h2>
      <p className='p2 text-secondary' >หมดอายุเมื่อ {date.toLocaleDateString('th-TH',
        { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p className='p2 text-secondary' >{status}</p>


    </div>
  )
}

export default HistoryList