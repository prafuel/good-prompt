import React from 'react'

const InputFilter = ({ text, placeholder = null, value, setValue = null, object = null, nrows = 3, disable = false }) => {
    return (
        <div className='flex flex-row  items-center justify-between h-fit'>
            {text}
            <textarea
                placeholder={(placeholder == null) ? "" : placeholder}
                rows={nrows}
                value={(object == null) ? value : value[object]}
                onChange={(e) => {
                    if (setValue == null) { return; }
                    if (object == null) { setValue(e.target.value); return; }
                    const prev = { ...value };
                    prev[object] = e.target.value;
                    setValue(prev);
                }}
                disabled={disable}
                className={`p-2 w-1/2 outline-none bg-black border border-blue-300 resize-none`}>
            </textarea>
        </div>
    )
}

export default InputFilter