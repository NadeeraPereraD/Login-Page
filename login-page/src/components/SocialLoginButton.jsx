import React from 'react'
import { FcGoogle } from "react-icons/fc"

export default function SocialLoginButton({ onClick, className, socialMedia: Icon }) {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      <Icon size={20} />
    </button>
  )
}
