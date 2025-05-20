import React from 'react'
import { useQuery } from '@tanstack/react-query';

import Loading from '../coponents/Loading'
import HistoryList from '../coponents/HistoryList'

import history from '/svg/history.svg'


const baseURL = import.meta.env.VITE_BASE_URL;
// http://localhost:8080/api/history
async function getHistory() {
    const response = await fetch(`${baseURL}/history`, {
      method: 'GET',
      credentials: 'include'
    })
    const data = await response.json()
    return data
}


// Main Component
function History() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['history'],
        queryFn: getHistory
    })

    if (isLoading) return <Loading />
    if (error) return <div>Error: {error.message}</div>

    console.log(data)

    
  return (
    <div className='history-page w-full' >
        <div className='flex flex-col items-center justify-center py-[5rem] gap-[2rem]'>
            <img src={history} alt="history" />

            <div className='history-list w-full flex flex-col gap-[1rem]'>
              {data.map((item) => (
                <HistoryList key={item.id} material={item.material} expireDate={item.exp} status={item.is_store} />
              ))}
            </div>

        </div>
    </div>
  )
}

export default History