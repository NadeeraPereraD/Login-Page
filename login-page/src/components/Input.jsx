import React, {useState} from 'react'

export default function Input({type, placeholder, className}) {
  const [value, setValue] = useState("");
  return (
    <div>
        <input
            type={type}                     
            value={value}                   
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className={className}
        />
    </div>
  )
}
