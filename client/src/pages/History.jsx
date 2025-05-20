import React from 'react'
import { useQuery } from '@tanstack/react-query';

import Loading from '../coponents/Loading'
import HistoryList from '../coponents/HistoryList'
import BackArrow from '../coponents/BackArrow';

import history from '/svg/history.svg'

import getHistory from '../lib/getHistory'



// Main Component
function History() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['history'],
        queryFn: getHistory
    })

    if (isLoading) return <Loading />
    if (error) return <div>Error: {error.message}</div>

    
  return (
    <div className='history-page w-full' >
        <div className='flex flex-col items-center justify-center py-[5rem] gap-[2rem]'>
            <BackArrow />

            
            <img src={history} alt="history" />

            <div className='history-list w-full flex flex-col gap-[1rem]'>
              {data.history.map((item) => (
                <HistoryList key={item.id} material={item.material} expireDate={item.exp} status={item.is_store} />
              ))}
            </div>

        </div>
    </div>
  )
}

export default History