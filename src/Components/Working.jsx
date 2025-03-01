import React, { useState } from 'react';
import Process from '../Data/ProcessData';

const Working = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className='relative mt-20'>
            <h1 className='font-Popins text-slate-900 text-7xl px-12 mb-6 font-bold'>Find Project Partner Easy way</h1>
            {Process.map((item, index) => (
                <div
                    key={index}
                    className='Elem'
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <div className='Overlay'></div>
                    <div className='Details'>
                        <h1 className='relative z-50'>{item.Title}</h1>
                    </div>
                </div>
            ))}
            {hoveredIndex !== null && (
                <div className='fixed rounded-xl w-72 leading-relaxed h-auto p-5 bg-[#1F2224] top-60 left-2/4 text-sm font-Popins font-extralight text-white'>
                    <img src={Process[hoveredIndex].DemoPic} alt={Process[hoveredIndex].Title} className='rounded-xl object-cover w-full h-40 mb-3' />
                    <p>{Process[hoveredIndex].Description}</p>
                </div>
            )}
        </div>
    );
}

export default Working;
