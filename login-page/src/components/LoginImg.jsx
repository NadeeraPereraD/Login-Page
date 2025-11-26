import React from 'react'

export default function LoginImg({src, alt, className}) {
  return (
    <div>
        <img src={src} alt={alt || 'Login Image'} className={className}></img>
    </div>
  )
}
