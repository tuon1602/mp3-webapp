import React from 'react'

const Error = (props) => {
    return (
        <div className='flex items-center justify-center '>
          <p className='font-bold text-slate-600 text-xl'>{props.title}</p>
        </div>
      )
}

export default Error