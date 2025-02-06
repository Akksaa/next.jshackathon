"use client";

import React, { useState, FormEvent } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CiLock, CiMail } from "react-icons/ci";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/app/components/Loading";

interface LoginFormData {
  email: string;
  password: string;
}

function Page() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log("Login Data:", formData);
      setLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.status == 400) {
        toast.error("Invalid Email or Pasword!");
        setLoading(false)
      } else if (response.status == 404) {
        toast.error("User does not exist! Redirecting to signup...");
        setTimeout(() => {
          router.push("/signup");
        }, 1500);
      } else if (response.status == 200) {
        const data = await response.json();
        console.log(data);
        toast.success("User logged in successfully!");
        setTimeout(() => {
          router.push("/profile");
        }, 1500);
      }

    } catch (error) {
      setLoading(false)
      console.error("Login error:", error);
      toast.error("User does not exist!");

    }
  };

  return (
    <div>
      <Toaster position="top-center" />
      <div className='bg-[url("/head.png")] h-[350px] w-full sm:bg-cover hidden md:flex justify-center items-center'>
        <div>
          <h1 className="openSans sm:text-[48px] text-[32px] text-white">
            Log In Page
          </h1>
          <ul className="flex mt-4 inter sm:text-[20px] text-[16px] sm:leading-[28px] text-center items-center justify-center">
            <li className="text-white ">Home </li>
            <li>
              <MdOutlineKeyboardArrowRight className="sm:text-[22px] text-[18px] text-white" />
            </li>
            <li className=" text-primYellow"> Log In</li>
          </ul>
        </div>
      </div>
      {loading ? (
        <Loading/>
      ) : (
        <div className="flex justify-center items-center h-screen bg-white sm:py-6 lg:py-12">
        <div className="bg-white w-[424px] p-6 h-[70%] shadow-lg">
          <h2 className="openSans text-[24px] leading-[32px] text-black text-center">
            Welcome Back!
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8 py-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiMail className="h-5 w-5 text-zinc-700" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Mail"
                className="pl-10 block mt-1 w-full placeholder:text-zinc-700 border-gray-200 border-2 text-xs outline-none px-3 py-2"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiLock className="h-5 w-5 text-zinc-700" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Password"
                className="pl-10 block mt-1 w-full placeholder:text-zinc-700 border-gray-200 border-2 text-xs outline-none px-3 py-2"
                required
              />
            </div>

            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="bg-primYellow w-full block text-sm inter transition-all py-2 border-primYellow border-2 hover:bg-white hover:border-primYellow hover:text-primYellow text-white"
              >
                Sign In
              </button>
              <p className="mt-6 text-sm text-gray-500 ">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="text-primYellow hover:underline">
                  sign up
                </a>
              </p>
            </div>
          </form>
        
        </div>
      </div>
      )}
      
    </div>
  );
}

export default Page;
