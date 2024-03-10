import React from 'react'

import Tag from './Tag'

const ListTag = (props) => {
    return (
        <div className='h-fit flex w-full flex-wrap gap-2 flex-row pt-3'>
            {
                props.arr.map((i) => {
                    return <Tag key={i} str={i} />
                })
            }
        </div>
    )
}

export default ListTag