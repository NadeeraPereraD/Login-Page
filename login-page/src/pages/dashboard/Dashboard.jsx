import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import image from "../../assets/dashboard4.jpg"
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/');
      return;
    }
    const userData = authService.getCurrentUser();
    setUser(userData);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const imageUrl = image;
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex flex-col md:flex-row flex-1 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-gray-800">
        <div className="bg-[#0a0b0f] w-full md:w-1/2 flex flex-col justify-center min-h-[calc(100vh-64px)] p-8">
            <p className="text-3xl text-white font-bold">Welcome to the <br></br>Soft Choice Appliances</p>
            <br></br>
            <p className="text-[18px] text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                molestiae labore ipsam tempore rem sapiente amet provident ut
                nostrum inventore, natus placeat aspernatur deserunt adipisci
                expedita facilis, eum voluptatem veniam.
            </p>         
        </div>
        <div className="bg-blue-600 w-full md:w-1/2 h-64 md:h-auto">
        <img
            src={imageUrl}
            alt="Dashboard Illustration"
            className="object-cover w-full h-full"
        />
        </div>
      </div>
    </div>
  );
}
