// components/DynamicTextArea.js
import React, { useRef, useEffect, useState } from 'react';

const DynamicTextArea = ({ value, onChange }) => {
    const textareaRef = useRef(null);

    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        if (textareaRef.current.scrollHeight > 200) {
          setIsOverflowing(true);
        } else {
          setIsOverflowing(false);
        }
      }
    }, [value]);

    const handleChange = (e) => {
        if (onChange) onChange(e.target.value);
    };


    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            placeholder='eg. Suggest some good machine learning major project ideas'
            style={
                {
                    'resize': 'none',
                    maxHeight: '800px',
                }
            }
            className={`autosize block w-full outline-none p-5 text-md bg-[#1b1b1b8a] border border-r-[#3a3a3a] border-l-[#3a3a3a] border-t-[#3a3a3a] border-b-transparent overflow-hidden ${isOverflowing ? 'overflow-y-scroll' : ''}`}
        />
    );
};

export default DynamicTextArea;
