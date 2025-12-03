import React, { useState } from "react";
import axios from "axios";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import LinkButton from "../../components/LinkButton";
import Button from "../../components/Button";
import SocialLoginButton from "../../components/SocialLoginButton";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useGoogleAuth,
  handleFacebookLogin,
} from "../../components/AuthLogin.js";

export default function RightFormPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleGoogleLogin = useGoogleAuth();

  const socials = [
    { name: "Google", icon: FcGoogle, color: "", onClick: handleGoogleLogin, },
    { name: "Apple", icon: FaApple, color: "#000000", onClick: () => console.log("Apple clicked"), },
    { name: "Facebook", icon: FaFacebook, color: "#1877F2", onClick: () => handleFacebookLogin(), },
  ];
  const loginForm = [
    {
      title: "Email Address",
      type: "text",
      placeholder: "Email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      className:
        "mb-2 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white",
    },
    {
      title: "Password",
      type: "password",
      placeholder: "Password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      className:
        "mb-4 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white",
    },
  ];

  const handleSignIn = async () => {
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      console.log("Login success:", res.data);

      localStorage.setItem("token", res.data.token);

      alert("Login successful!");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error || "Login failed");
      } else {
        alert("Something went wrong");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="w-full md:w-1/2 rounded-2xl aspect-[1.2] flex flex-col pl-10 pr-10">
      <Logo />
      <h2 className="text-white text-xl md:text-2xl mb-4">Welcome Back</h2>
      {loginForm.map((item, index) => (
        <div key={index}>
          <h6 className="text-white">{item.title}</h6>
          <Input
            type={item.type}
            placeholder={item.placeholder}
            value={item.value}
            onChange={item.onChange}
            className={item.className}
          />
        </div>
      ))}
      {/* <h6 className="text-white">Email Address</h6>
      <Input
        type={"text"}
        placeholder={"Email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={
          "mb-2 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        }
      /> */}
      {/* <h6 className="text-white">Password</h6>
      <Input
        type={"password"}
        placeholder={"Password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={
          "mb-4 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        }
      /> */}
      <LinkButton
        onClick={() => alert("Clicked!")}
        className={
          "flex justify-end underline hover:cursor-pointer mb-6 text-[#6d54b5]"
        }
      >
        Forget Password
      </LinkButton>

      <Button
        onClick={handleSignIn}
        className="bg-[#6d54b5] text-white px-4 py-2 rounded-lg mb-2 active:animate-pulse cursor-pointer"
      >
        Sign In
      </Button>

      <div className="flex items-center gap-2 my-4 mb-2">
        <hr className="flex-1 border-[#595365]" />
        <span className="text-[#595365] text-[10px]">Or continue with</span>
        <hr className="flex-1 border-[#595365]" />
      </div>

      <div className="flex items-center justify-around gap-4 mt-4">
        {socials.map((item) => (
          <SocialLoginButton
            key={item.name}
            socialMedia={item.icon}
            color={item.color}
            onClick={item.onClick}
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
        {/* <LinkButton
          onClick={() => navigate("/signup")}
          className={
            "flex justify-end underline hover:cursor-pointer mb-2 text-[#6d54b5] text-[15px]"
          }
        >
          Sign Up
        </LinkButton> */}
        <Link
          to="/signup"
          className="flex justify-end underline hover:cursor-pointer mb-2 text-[#6d54b5] text-[15px]"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
