import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { BlogPost } from "@/types/Blog";
import Image from "next/image";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { RiAccountCircle2Line } from "react-icons/ri";
import Link from "next/link";
import Blogsidebar from "@/app/components/Blogsidebar";
import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default async function page() {
    const blogs = await client.fetch(`
        *[ _type == "foodBlog"]{
          quote,
          author,
          _createdAt,
          title,
          images[] {asset -> {url}},
          description1,
          description2,
          slug
          }
      `);
      
      
    return (
      <>
      <div className='bg-[url("/head.png")] h-[350px] w-full sm:bg-cover flex justify-center items-center'>
        <div>
            <h1 className='openSans sm:text-[48px] text-[32px] text-white'>Our Blogs</h1>
            <ul className='flex mt-4 inter sm:text-[20px] text-[16px] sm:leading-[28px] text-center items-center justify-center'>
            <li className='text-white '>Home </li>
            <li><MdOutlineKeyboardArrowRight className='sm:text-[22px] text-[18px] text-white'/></li>
            <li className=' text-primYellow'> Blogs</li>
            </ul>
        </div>
      </div>
      <div className="lg:max-w-5xl max-w-full mx-auto sm:px-4 px-2 py-8 flex sm:gap-2 lg:gap-5 justify-between">
        <div className="grid lg:gap-8 gap-3 lg:w-[70%] w-[100%]">
          {blogs.map((blog:BlogPost) => (
            <article key={blog._id} className="bg-white overflow-hidden">
              <div className="relative lg:h-[520px] sm:h-[320px] h-[280px] w-full">
                <Image
                  src={urlFor(blog.images[0]).url()}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="sm:py-4 py-2 sm:px-2 px-1">
                <div className="mb-2 flex gap-1">
                    <span className="flex gap-1 items-center ">
                         <IoCalendarNumberSharp className="text-primYellow text-[12px] sm:text-[20px]"/> <span className="inter text-zinc-700 text-[8px] sm:text-[16px]">{new Date(blog._createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                        })} / </span>
                    </span>
                    <span className="flex gap-1 items-center">
                         <RiAccountCircle2Line className="text-primYellow text-[12px] sm:text-[20px]"/> <span className="inter text-zinc-700 text-[8px] sm:text-[16px]">{blog.author}</span>
                    </span>
                </div>
                  <h2 className="text-[18px] sm:text-[24px] font-normal openSans mb-2 hover:text-primYellow">
                    {blog.title}
                  </h2>
                <div className="inter sm:text-[16px] text-[12px] font-normal text-zinc-700 sm:leading-6">
                {blog.description1 && (
                blog.description1.split(' ').length > 100 
                    ? blog.description1.split(' ').slice(0, 60).join(' ') + '...'
                    : blog.description1
                )}
                </div>
                <div>
                    <Link href={`/blogs/${blog.slug.current}`}>
                        <button className="text-primYellow text-[8px] sm:text-[16px] inter bg-white border mt-2 border-primYellow rounded-md sm:px-4 px-2 sm:py-2 py-1">
                            Read More
                        </button>                
                    </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Blogsidebar/>
      </div>
      </>
    );
  }

