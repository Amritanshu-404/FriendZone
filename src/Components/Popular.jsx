import React from 'react'
import CData from '../Data/CAreaData';

const Popular = () => {
    return (
        <div>
            <div className='Categories p-10 rounded-3xl px-28 h-full mt-10  bg-[#181818] '>
                <h1 className='font-Popins mb-5 text-3xl text-center text-white'>Popular Categories Of Project</h1>
                <hr />
                <div className='CArea gap-x-11 gap-y-8 grid justify-center grid-cols-3 grid-rows-2 pl-24 mt-5'>
                    {CData.map((item, index) => (
                        <div key={index} className='Card w-72 h-72 bg-[#1F2224] rounded-2xl text-2xl font-MonaSans text-white overflow-hidden hover:bg-orange-700 transition-all '>
                            <h1 className='p-4 pb-2 font-medium'>{item.heading}</h1>
                            <hr className='border-[#474747] pb-2' />
                            <div className='h-60 relative flex justify-center w-full'>
                                <div className='absolute bg-[#757575] bg-opacity-50 backdrop-filter backdrop-blur-lg w-[85%] h-full rounded-xl -top-1'></div>
                                <div className='absolute bg-[#d6d5d5] bg-opacity-50 backdrop-filter backdrop-blur-lg w-[95%] top-1 h-full rounded-xl'></div>
                                <img src={item.image} className='rounded-xl z-50 w-full h-auto mt-3' alt={item.heading} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Popular
