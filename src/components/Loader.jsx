import React from 'react'

export default function Loader() {
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full border-t-4 border-violet-500 border-solid h-10 w-10'></div>
    </div>
  )
}
