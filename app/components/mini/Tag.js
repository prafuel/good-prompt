import React from 'react'

const Tag = (props) => {
  return (
    <>
        <div className='bg-[#0f2234] rounded-2xl p-2 inline-block cursor-pointer'>{props.str}</div>
    </>
  )
}

export default Tag