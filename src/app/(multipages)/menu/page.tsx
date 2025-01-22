import React from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from 'next/image';
import MenuList from '@/app/components/MenuList';

function page() {
  return (
    <>
    <div>
      <div 
      rel="preload"
      className='bg-[url("/head.png")] h-[350px] w-full sm:bg-cover flex justify-center items-center'>
        <div>
           <h1 className='openSans sm:text-[48px] text-[32px] text-white'>Our Menu</h1>
           <ul className='flex mt-4 inter sm:text-[20px] text-[16px] sm:leading-[28px] text-center items-center justify-center'>
            <li className='text-white '>Home </li>
            <li><MdOutlineKeyboardArrowRight className='sm:text-[22px] text-[18px] text-white'/></li>
            <li className=' text-primYellow'> Menu</li>
           </ul>
        </div>
      </div>
      <main className='h-full w-full flex justify-center items-center'>
          <div className='xl:w-[1320px] w-full flex flex-col-reverse md:flex-row justify-between lg:mt-20 p-2 xl:p-0 sm:gap-3 xl:gap-0'>
            <div className='mt-2 sm:mt-0'>
              <Image src={'/menu1.png'} alt='' height={626} width={448}/>
            </div>
            <div className='xl:w-[760px] lg:w-[650px] sm:w-[330px] w-full'>
              <h1 className='openSans xl:text-[48px] sm:text-[38px] text-[28px] text-zinc-800 '>Starter Menu</h1>
                <MenuList category="starter"/>
            </div>
          </div>
      </main>
      <main className='h-full w-full flex justify-center items-center'>
          <div className='xl:w-[1320px] w-full flex flex-col md:flex-row justify-between lg:mt-20 p-2 xl:p-0 sm:gap-3 xl:gap-0'>
            <div className='xl:w-[760px] lg:w-[650px] sm:w-[330px] w-full'>
              <h1 className='openSans xl:text-[48px] sm:text-[38px] text-[28px] text-zinc-800 '>Main Course</h1>
              <MenuList category='main'/>
            </div>
            <div className='mt-2 sm:mt-0'>
              <Image src={'/menu2.png'} alt='' height={626} width={448}/>
            </div>
          </div>
      </main>
      <div className="sm:h-[470px] h-full w-full flex justify-center items-center lg:items-center bg-cover bg-[url('/boxbg.png')] my-6">
        <div className="p-5">
          <Image src={'/box2.png'} alt="" width={1320} height={247}/>
        </div>
      </div>
      <main className='h-full w-full flex justify-center items-center my-6'>
          <div className='xl:w-[1320px] w-full flex flex-col-reverse md:flex-row justify-between lg:mt-20 p-2 xl:p-0 sm:gap-3 xl:gap-0'>
            <div className='mt-2 sm:mt-0'>
              <Image src={'/menu3.png'} alt='' height={626} width={448}/>
            </div>
            <div className='xl:w-[760px] lg:w-[650px] sm:w-[330px] w-full'>
              <h1 className='openSans xl:text-[48px] sm:text-[38px] text-[28px] text-zinc-800 '>Desserts</h1>
              <MenuList category='desserts'/>
            </div>
          </div>
      </main>
      <main className='h-full w-full flex justify-center items-center my-6'>
          <div className='xl:w-[1320px] w-full flex flex-col md:flex-row justify-between lg:mt-20 p-2 xl:p-0 sm:gap-3 xl:gap-0'>
            
            <div className='xl:w-[760px] lg:w-[650px] sm:w-[330px] w-full'>
              <h1 className='openSans xl:text-[48px] sm:text-[38px] text-[28px] text-zinc-800 '>Drinks </h1>
              <MenuList category='drinks'/>
            </div>
            <div className='mt-2 sm:mt-0'>
              <Image src={'/menu4.png'} alt='' height={626} width={448}/>
            </div>
          </div>
      </main>
    </div>
    </>
    
  )
}

export default page
