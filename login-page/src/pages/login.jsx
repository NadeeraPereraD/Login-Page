import React from "react";
import LoginImg from "../components/LoginImg";
import image from "../assets/backgroundImg2.jpg";
import Logo from "../components/Logo";
import Input from "../components/Input";
import LinkButton from "../components/LinkButton";
import Button from "../components/Button";
import SocialLoginButton from "../components/SocialLoginButton";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";

export default function Login() {
  const imageUrl = image;
  const socials = [
    { name: "Google", icon: FcGoogle },
    { name: "Apple", icon: FaApple },
    { name: "Facebook", icon: FaFacebook },
  ];
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#686279]/80 overflow-auto p-4">
      <div
        className="bg-[#2c2638] rounded-xl p-4 md:p-6
                   w-full max-w-[1000px] 
                   flex flex-col md:flex-row gap-4"
      >
        <div className="w-full md:w-1/2 aspect-[1.2] flex justify-center">
          <LoginImg
            src={imageUrl}
            alt="Login Image"
            className="w-full h-full rounded-2xl"
          />
        </div>

        <div className="w-full md:w-1/2 rounded-2xl aspect-[1.2] flex flex-col pl-10 pr-10">
          <Logo />
          <h2 className="text-white text-xl md:text-2xl mb-4">Welcome Back</h2>
          <h6 className="text-white">Email Address</h6>
          <Input
            type={"text"}
            placeholder={"Email"}
            className={
              "mb-2 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            }
          />
          <h6 className="text-white">Password</h6>
          <Input
            type={"password"}
            placeholder={"Password"}
            className={
              "mb-4 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            }
          />
          <LinkButton
            onClick={() => alert("Clicked!")}
            className={
              "flex justify-end underline hover:cursor-pointer mb-6 text-[#6d54b5]"
            }
          >
            Forget Password
          </LinkButton>

          <Button
            onClick={() => console.log("Sign In clicked")}
            className="bg-[#6d54b5] text-white px-4 py-2 rounded-lg mb-2 active:animate-pulse cursor-pointer"
          >
            Sign In
          </Button>

          <div className="flex items-center gap-2 my-4 mb-2">
            <hr className="flex-1 border-[#595365]" />
            <span className="text-[#595365] text-[10px]">Or Continue With</span>
            <hr className="flex-1 border-[#595365]" />
          </div>

          <div className="flex items-center justify-around gap-4 mt-4">
            {socials.map((item) => (
              <SocialLoginButton
                key={item.name}
                socialMedia={item.icon}
                onClick={() => console.log(item.name + " Clicked")}
                className="flex items-center justify-center
                            w-12 h-12 rounded-full border border-gray-300
                            hover:bg-gray-100 active:scale-95 transition-all duration-150
                            cursor-pointer"
              />
            ))}
          </div>

          <div className="flex mt-6 gap-1">
            <span className="text-[#595365] text-[15px]">
              Don't have an account?
            </span>
            <LinkButton
              onClick={() => alert("Clicked!")}
              className={
                "flex justify-end underline hover:cursor-pointer mb-2 text-[#6d54b5] text-[15px]"
              }
            >
              Sign Up
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
