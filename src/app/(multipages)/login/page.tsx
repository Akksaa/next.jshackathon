'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { CiLock, CiMail } from 'react-icons/ci'
import { useRouter } from 'next/navigation'

// Define interface for form data
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

function Page() {
  // Initialize state for form data
  const router = useRouter(); // Add router

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    // Add your login API call here
    try {
      // Example API call
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:formData.email,
          password: formData.password
        })
      });
      if (response.status == 400) {
        alert('Invalid Email or Pasword!')
      }
      else if (response.status == 404) {
        alert('User does not exist! Redirecting to signup...');
        // Wait a moment before redirecting so user can see the message
        setTimeout(() => {
          router.push('/signup');
        }, 1500);
      }
      const data = await response.json();
      console.log(data)
      alert('User logged in successfully!')
    } catch (error) {
      console.error('Login error:', error);
      alert('User does not exist!')
    }
  };

  return (
    <div>
      <div className='bg-[url("/head.png")] h-[350px] w-full sm:bg-cover hidden md:flex justify-center items-center'>
      <div>
           <h1 className='openSans sm:text-[48px] text-[32px] text-white'>Log In Page</h1>
           <ul className='flex mt-4 inter sm:text-[20px] text-[16px] sm:leading-[28px] text-center items-center justify-center'>
            <li className='text-white '>Home </li>
            <li><MdOutlineKeyboardArrowRight className='sm:text-[22px] text-[18px] text-white'/></li>
            <li className=' text-primYellow'> Log In</li>
           </ul>
        </div>
      </div>
      <div className='flex justify-center items-center min-h-screen bg-white sm:py-6 lg:py-12'>
        <div className='bg-white w-[424px] p-6 h-full shadow-lg' >
          <h2 className='openSans text-[24px] leading-[32px] text-black text-center'>Welcome Back!</h2>

          <form onSubmit={handleSubmit} className='space-y-4 py-4'>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiMail className="h-5 w-5 text-zinc-700" />
              </div>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder='Mail'
                className='pl-10 block mt-1 w-full placeholder:text-zinc-700 border-gray-200 border-2 text-xs outline-none px-3 py-2'
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
                onChange={handleChange}
                placeholder='Password'
                className='pl-10 block mt-1 w-full placeholder:text-zinc-700 border-gray-200 border-2 text-xs outline-none px-3 py-2'
                required
              />
            </div>

            <div className='flex gap-2'>
              <input 
                type="checkbox" 
                name="rememberMe" 
                id="check" 
                checked={formData.rememberMe}
                onChange={handleChange}
                className=''
              />
              <p className='text-[16px]'>Remember me?</p>
            </div>

            <div>
              <button 
                type="submit"
                className='bg-primYellow w-full block text-sm inter transition-all py-2 border-primYellow border-2 hover:bg-white hover:border-primYellow hover:text-primYellow text-white'
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;