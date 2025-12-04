import React from "react";
import LoginImg from "../../components/login/LoginImg";
import image from "../../assets/backgroundImg2.jpg";

export default function LeftImg() {
  const imageUrl = image;
  return (
    <div className="w-full md:w-1/2 aspect-[1.2] flex justify-center">
      <LoginImg
        src={imageUrl}
        alt="Login Image"
        className="w-full h-full rounded-2xl"
      />
    </div>
  );
}
