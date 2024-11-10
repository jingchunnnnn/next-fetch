import React from 'react'

export default function Loader() {
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full border-t-8 border-dark-green border-solid h-20 w-20'></div>
    </div>
  )
}
