import React from "react";
import LeftImg from "./LeftImg";
import RightFormPanel from "./RightFormPanel";
import SignUp from "./SignUp";
import { Outlet } from "react-router-dom";

export default function Login() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#686279]/80 overflow-auto p-4">
      <div
        className="bg-[#2c2638] rounded-xl p-4 md:p-6
                   w-full max-w-[1000px] 
                   flex flex-col md:flex-row gap-4"
      >
        
        <LeftImg/>
        {/* <RightFormPanel/> */}
        {/* <SignUp/> */}
        <Outlet/>
        
      </div>
    </div>
  );
}
