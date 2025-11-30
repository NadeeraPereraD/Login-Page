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

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const socials = [
    { name: "Google", icon: FcGoogle, color: "" },
    { name: "Apple", icon: FaApple, color: "#000000" },
    { name: "Facebook", icon: FaFacebook, color: "#1877F2" },
  ];

  const handleSignUp = async () => {
    const formErrors = validation({ email, password, confirmPassword });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); 
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/users/", {
        firstName,
        lastName,
        email,
        password,
      });

      console.log("User registered successfully:", res.data);
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error || "User registration failed");
      } else {
        alert("Something went wrong");
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
        {/* <LinkButton
          onClick={() => navigate("/")}
          className={
            "flex justify-end underline hover:cursor-pointer mb-2 text-[#6d54b5] text-[15px]"
          }
        >
          Login
        </LinkButton> */}
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={
              "border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            }
          />
        </div>
      </div>
      <h6 className="text-white">Email Address</h6>
      <Input
        type={"text"}
        placeholder={"Email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={
          "border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        }
      />
      <h6 className="text-white">Password</h6>
      <Input
        type={"password"}
        placeholder={"Password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={
          "border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        }
      />
      <h6 className="text-white">Confirm Password</h6>
      <Input
        type={"password"}
        placeholder={"Confirm Password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={
          "mb-4 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        }
      />

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
        {socials.map((item) => (
          <SocialLoginButton
            key={item.name}
            socialMedia={item.icon}
            color={item.color}
            onClick={() => console.log(item.name + " Clicked")}
            className="flex items-center justify-center
                                w-12 h-12 rounded-full border border-gray-300
                                hover:bg-gray-100 active:scale-95 transition-all duration-150
                                cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}
