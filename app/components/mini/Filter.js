import React from 'react'

const Filter = (props) => {
    const { q, arr, func, object, filter} = props.data;
    
    // if(filter[object] === "--- Select ---"){
    //     filter[object] = null;
    // }

    return (
        <div className='flex flex-row  items-center justify-between h-fit'>
            <span className='w-full md:w-auto'>{q}</span>
            <select className='p-2 w-1/2 outline-none bg-black border border-blue-300' value={filter[object]} onChange={(e) => {
                const prev = {...filter};
                prev[object] = e.target.value;
                func(prev);
            }}>
                {
                    arr.map((item, index) => {
                        return <option className="outline-none bg-black" key={`${item}k${index}`}>{item}</option>
                    })
                }
            </select>
        </div>
    );
};


export default Filter