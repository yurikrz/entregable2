import React from 'react'

const Loader = () => {
  return (
    <div className='bg-[#373839] h-full w-full fixed top-0 left-0 z-10 flex flex-col justify-center items-center gap-2'>
        <img src="/loader.svg" alt="" />
        <h4 className='text-white text-2xl not-italic font-semibold leading-[normal]' >Weather app</h4>
        <div className='loader'><span></span></div>
    </div>
  )
}

export default Loader
