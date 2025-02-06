"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import axios from 'axios';
import {toast} from 'react-hot-toast'
import Loading from "@/app/components/Loading";

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
  
    try {
      console.log("Form Data:", formData);
      setLoading(true);
      
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if( res.status == 409) {
        toast.error('User Already Exists!')
      }
      console.log("Signup success:", res.data);
      router.push("/login");
      
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        
        console.log("Signup failed:", error.message);
        toast.error(error.message);
      } else {
        console.log("Signup failed with unknown error");
        toast.error("Failed to sign up. Please try again later.");
      }
    }
  };
  

  useEffect(() => {
    if (formData.email.length > 0 && formData.password.length > 0 && formData.username.length > 0 ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [formData])

  return (
    <div>
      <div className='bg-[url("/head.png")] h-[350px] w-full sm:bg-cover hidden md:flex justify-center items-center'>
        <div>
          <h1 className="openSans sm:text-[48px] text-[32px] text-white">
            Sign Up Page
          </h1>
          <ul className="flex mt-4 inter sm:text-[20px] text-[16px] sm:leading-[28px] text-center items-center justify-center">
            <li className="text-white ">Home </li>
            <li>
              <MdOutlineKeyboardArrowRight className="sm:text-[22px] text-[18px] text-white" />
            </li>
            <li className=" text-primYellow"> Sign Up</li>
          </ul>
        </div>
      </div>
     
     {loading ? (
      <Loading/>
     ) : (
      <div className="flex justify-center items-center min-h-screen bg-white sm:py-6 lg:py-12">
      <div className="bg-white w-[424px] p-6 h-[624px] shadow-lg">
        <h2 className="openSans text-[20px] leading-[26px] text-black">
          Sign up!
        </h2>

        <form className="space-y-4 py-4" >
          <div className="relative mt-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CiUser className="h-5 w-5 text-zinc-700" />
            </div>
            <input
              type="text"
              name="username"
              id=""
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              placeholder="Name"
              className="pl-10 block mt-1 w-full placeholder:text-zinc-700 border-gray-200 border-2 text-xs outline-none px-3 py-2 "
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CiMail className="h-5 w-5 text-zinc-700" />
            </div>
            <input
              type="email"
              name="email"
              id=""
              placeholder="Mail"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="pl-10 block mt-1 w-full placeholder:text-zinc-700 border-gray-200 border-2 text-xs outline-none px-3 py-2 "
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CiLock className="h-5 w-5 text-zinc-700" />
            </div>
            <input
              type="password"
              name="password"
              id=""
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Password"
              className="pl-10 block mt-1 w-full placeholder:text-zinc-700 border-gray-200 border-2 text-xs outline-none px-3 py-2 "
            />
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="rememberMe"
              id="check"
              className=""
            />
            <p className="text-[16px]">Remember me?</p>
          </div>
          <div className="">
              <button
                  onClick={handleSubmit}
                  type="submit"
                  className="bg-primYellow w-full block text-sm inter transition-all py-2 border-primYellow border-2 hover:bg-white hover:border-primYellow hover:text-primYellow text-white"
              >
                  {buttonDisabled ? (
                    <div className=" cursor-not-allowed"> Sign Up</div>
                  ) : (
                    <div>Sign Up</div>
                  )}
              </button>
          </div>
          <div className="text-xs text-center justify-center flex ">
            <p>Already have an Account? </p>
            <Link href={"./login"} className="text-primYellow ml-2 underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
     )}
     
    </div>
  );
}

export default Page;
