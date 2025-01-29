"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import LogoutButton from "@/app/components/LogoutButton";
import Loading from "@/app/components/Loading";
import ErrorComponent from "@/app/components/Error";
import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  ArrowRight,
  Bell,
  Edit,
  Lock,
  Mail,
  Settings,
  User,
} from "lucide-react";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/me");
        setUserData(res.data.data[0]); // Store the fetched data in state
        setLoading(false);
        console.log("user data", res.data.data[0]);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching profile data:", error);
          setError(error.message); // Store the error in state
          setLoading(false);
        }
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <>
      <div className='bg-[url("/head.png")] h-[350px] w-full sm:bg-cover hidden md:flex justify-center items-center'>
        <div>
          <h1 className="openSans sm:text-[48px] text-[32px] text-white">
            Profile Page
          </h1>
          <ul className="flex mt-4 inter sm:text-[20px] text-[16px] sm:leading-[28px] text-center items-center justify-center">
            <li className="text-white ">Home </li>
            <li>
              <MdOutlineKeyboardArrowRight className="sm:text-[22px] text-[18px] text-white" />
            </li>
            <li className=" text-primYellow">My Profile</li>
          </ul>
        </div>
      </div>
      {userData ? (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full transform transition-all hover:scale-105">
            {/* Profile Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold inter text-gray-800">
                Welcome back!
              </h1>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-600 hover:text-primYellow transition-colors">
                  <Bell size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:text-primYellow transition-colors">
                  <Settings size={20} />
                </button>
              </div>
            </div>

            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="w-full h-full rounded-full openSans bg-gradient-to-r from-primYellow to-orange-200 flex items-center justify-center text-white text-3xl font-bold">
                {userData?.username?.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                <Edit size={16} className="text-gray-600" />
              </button>
            </div>

            {userData && (
              <div className="space-y-6 inter">
                <div className="bg-gray-50 rounded-xl p-4 transition-all hover:bg-gray-100">
                  <div className="flex items-center space-x-3">
                    <User className="text-primYellow" />
                    <div>
                      <label className="block text-sm font-semibold text-gray-600">
                        Username
                      </label>
                      <p className="text-lg font-medium text-gray-900">
                        {userData.username}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 transition-all hover:bg-gray-100">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-primYellow" />
                    <div>
                      <label className="block text-sm font-semibold text-gray-600">
                        Email
                      </label>
                      <p className="text-lg font-medium text-gray-900">
                        {userData.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Logout Button */}
            <div>
              <LogoutButton userId={userData.id} />
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all hover:scale-105">
            <div className="flex flex-col items-center text-center ">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 ">
                <Lock className="w-8 h-8 text-red-600" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2 openSans">
                Authentication Required
              </h1>

              <p className="text-gray-600 font-normal mb-8 inter text-sm">
                Please sign in to view your profile. If you don&apos;t have an
                account yet, you can create one for free.
              </p>

              <div className="space-y-4 w-full openSans">
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="w-full bg-primYellow text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-amber-400 transition-colors"
                >
                  <span>Sign In</span>
                  <ArrowRight size={20} />
                </button>

                <button
                  onClick={() => (window.location.href = "/signup")}
                  className="w-full bg-white text-primYellow border-2 border-primYellow py-3 px-6 rounded-xl font-semibold hover:bg-yellow-50 transition-colors"
                >
                  Create Account
                </button>
              </div>

              <p className="mt-6 text-sm text-gray-500 inter">
                Need help?{" "}
                <a href="/support" className="text-primYellow hover:underline">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
