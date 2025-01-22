import React from 'react';
import Blogsidebar from '@/app/components/Blogsidebar';
import BlogDetails from '@/app/components/BlogDetails';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';



function page({params}:{params:{slug:string}}) {
    

  return (
    <>
    <div className='bg-[url("/head.png")] h-[350px] w-full sm:bg-cover flex justify-center items-center'>
        <div>
            <h1 className='openSans sm:text-[48px] text-[32px] text-white'>Our Shop</h1>
            <ul className='flex mt-4 inter sm:text-[20px] text-[16px] sm:leading-[28px] text-center items-center justify-center'>
            <li className='text-white '>Home </li>
            <li><MdOutlineKeyboardArrowRight className='sm:text-[22px] text-[18px] text-white'/></li>
            <li className=' text-primYellow'> Shop</li>
            </ul>
        </div>
      </div>
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-5 justify-between">
        <article className="">
            <BlogDetails params={params}/>
        </article>
        <aside>
            <Blogsidebar/>
        </aside>
    </div>
    </>
    
  )
}

export default page;
