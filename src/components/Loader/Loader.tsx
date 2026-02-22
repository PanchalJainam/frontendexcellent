import React from 'react'

const Loader = () => {
    return (
        <div className='flex flex-col justify-center items-center h-[70vh] gap-1.5'>
            <div className='w-10 h-10 border-3 border-[#183153] border-t-transparent rounded-full animate-spin'></div>
            <span className='font-semibold'>Loading...</span>
        </div>
    )
}

export default Loader