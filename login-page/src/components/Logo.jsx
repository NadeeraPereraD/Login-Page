import React from 'react'
import image from '../assets/Logo.png';

export default function Logo() {
    const imageUrl = image;
  return (
    <div>
        <img src={imageUrl} alt='Logo Image' className='w-[100px] h-[50px]'></img>
    </div>
  )
}
