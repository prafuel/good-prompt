import React from 'react'

const InputFilter = ({text, placeholder, value, setValue, object}) => {
    return (
        <div className='flex flex-row  items-center justify-between h-fit'>
            {text}
            <textarea
                placeholder={placeholder}
                rows={3}
                value={value[object]}
                onChange={(e) => {
                    const prev = { ...value };
                    prev[object] = e.target.value;
                    setValue(prev);
                }}
                className='p-2 w-1/2 outline-none bg-black border border-blue-300 resize-none'>
            </textarea>
        </div>
    )
}

export default InputFilter