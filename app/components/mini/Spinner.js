import React from 'react'

const Spinner = () => {
  return (
    <div style={{
        'border-top-color': '#3498db',
        'animation': 'spin 1.5s linear infinite',
      }} className="ease-linear rounded-full border-2 border-t-2 border-gray-200 h-10 w-10"></div>
  )
}

export default Spinner