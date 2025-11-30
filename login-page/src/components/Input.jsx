import React, {useState} from 'react'

export default function Input({type, placeholder, className, value, onChange}) {
  return (
    <div>
        <input
            type={type}                     
            value={value}                   
            onChange={onChange}
            placeholder={placeholder}
            className={className}
        />
    </div>
  )
}
