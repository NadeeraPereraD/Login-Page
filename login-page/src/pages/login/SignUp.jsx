import React, { useState } from "react";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import Button from "../../components/Button";
import SocialLoginButton from "../../components/SocialLoginButton";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import validation from "../../components/Validations";
import axios from "axios";
import { useGoogleAuth, handleFacebookLogin } from "../../components/AuthLogin.js";
import authService from "../../services/authService.js";

export default function SignUp() {
  //const jwt_decode = jwtDecodeModule.default;
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const handleGoogleLogin = useGoogleAuth();

  const socials = [
    {
      name: "Google",
      icon: FcGoogle,
      color: "",
      onClick: handleGoogleLogin,
    },
    // {
    //   name: "Apple",
    //   icon: FaApple,
    //   color: "#000000",
    //   onClick: () => console.log("Apple clicked"),
    // },
    {
      name: "Facebook",
      icon: FaFacebook,
      color: "#1877F2",
      onClick: () => handleFacebookLogin(),
    },
  ];

  const signupForm = [
    {
      title: "Email Address",
      type: "text",
      placeholder: "Email",
      value: formData.email,
      onChange: (e) => setFormData({ ...formData, email: e.target.value }),
      className:
        "border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white",
    },
    {
      title: "Password",
      type: "password",
      placeholder: "Password",
      value: formData.password,
      onChange: (e) => setFormData({ ...formData, password: e.target.value }),
      className:
        "border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white",
    },
    {
      title: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
      value: confirmPassword,
      onChange: (e) => setConfirmPassword(e.target.value),
      className:
        "mb-4 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white",
    },
  ];

  const handleSignUp = async () => {
    const formErrors = validation({ 
      email: formData.email, 
      password: formData.password, 
      confirmPassword 
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const data = await authService.register(formData);
      console.log("User registered successfully:", data);
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error || "User registration failed");
      } else {
        alert(err.response?.data?.error || 'Registration failed. Please try again.');
      }
      console.error("User registration error:", err);
    }
  };

  return (
    <div className="w-full md:w-1/2 rounded-2xl aspect-[1.2] flex flex-col pl-10 pr-10">
      <Logo />
      <h2 className="text-white text-xl md:text-2xl mb-2">Create an account</h2>
      <div className="flex mb-1 gap-1">
        <span className="text-[#595365] text-[15px]">
          Already have an account?
        </span>
        <Link
          to="/"
          className="flex justify-end underline hover:cursor-pointer mb-2 text-[#6d54b5] text-[15px]"
        >
          Login
        </Link>
      </div>
      <div className="flex">
        <div className="flex-col mr-1.5">
          <h6 className="text-white">First Name</h6>
          <Input
            type={"text"}
            placeholder={"First Name"}
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className={
              "border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            }
          />
        </div>
        <div className="flex-col">
          <h6 className="text-white">Last Name</h6>
          <Input
            type={"text"}
            placeholder={"Last Name"}
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className={
              "border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            }
          />
        </div>
      </div>
      {signupForm.map((item, index) => (
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

      <Button
        onClick={handleSignUp}
        className="bg-[#6d54b5] text-white px-4 py-2 rounded-lg mb-2 active:animate-pulse cursor-pointer"
      >
        Create Account
      </Button>

      <div className="flex items-center gap-2 my-4 mb-2">
        <hr className="flex-1 border-[#595365]" />
        <span className="text-[#595365] text-[10px]">Or register with</span>
        <hr className="flex-1 border-[#595365]" />
      </div>

      <div className="flex items-center justify-around gap-4 mt-4">
        {socials.map((item, index) => (
          <SocialLoginButton
            key={index}
            socialMedia={item.icon}
            color={item.color}
            onClick={item.onClick}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-100 active:scale-95 transition-all duration-150 cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}
