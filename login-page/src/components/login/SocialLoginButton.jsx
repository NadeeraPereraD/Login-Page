import React from 'react'
import { FcGoogle } from "react-icons/fc"

export default function SocialLoginButton({ onClick, className, socialMedia: Icon, color }) {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      <Icon size={20} color={color}/>
    </button>
  )
}
