import React from 'react'

const Filter = (props) => {
    const { q, arr, func, value } = props.data;

    if (value.trim().length === 0) {
        func(arr[0]);
    }

    return (
        <div className='flex flex-col md:flex-row items-center justify-between h-fit'>
            <span className='w-full md:w-auto'>{q}</span>
            <select className='p-2 w-1/2 outline-none bg-black border' value={value} onChange={(e) => { func(e.target.value) }}>
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