import React from 'react'

import HistoryList from '../coponents/HistoryList'

import history from '/svg/history.svg'

function History() {
  return (
    <div className='history-page w-full' >
        <div className='flex flex-col items-center justify-center py-[5rem] gap-[2rem]'>
            <img src={history} alt="history" />

            <div className='history-list w-full'>
                <HistoryList />
            </div>

        </div>
    </div>
  )
}

export default History