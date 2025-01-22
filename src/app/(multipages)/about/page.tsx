import Image from "next/image";
import React from "react";
import { PiChefHatThin } from "react-icons/pi";
import { BsCupHot } from "react-icons/bs";
import { IoBodyOutline } from "react-icons/io5";
import MenuList from "@/app/components/MenuList";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function page() {
    const teamMembers = [
        {
          name: "Mark Henry",
          role: "Owner",
          socials: [
            { platform: "facebook", link: "#" },
            { platform: "twitter", link: "#" },
            { platform: "instagram", link: "#" },
          ],
        },
        {
          name: "Lucky Helen",
          role: "Chef",
          socials: [
            { platform: "facebook", link: "#" },
            { platform: "twitter", link: "#" },
            { platform: "instagram", link: "#" },
          ],
        },
        {
          name: "Moon Henry",
          role: "Founder",
          socials: [
            { platform: "facebook", link: "#" },
            { platform: "twitter", link: "#" },
            { platform: "instagram", link: "#" },
          ],
        },
        {
          name: "Tom Monrow",
          role: "Specialist",
          socials: [
            { platform: "facebook", link: "#" },
            { platform: "twitter", link: "#" },
            { platform: "instagram", link: "#" },
          ],
        },
      ];
    return (
        <div>

        <div className='bg-[url("/head.png")] h-[350px] w-full sm:bg-cover flex justify-center items-center'>
        <div>
           <h1 className='openSans sm:text-[48px] text-[32px] text-white'>About Us</h1>
           <ul className='flex mt-4 inter sm:text-[20px] text-[16px] sm:leading-[28px] text-center items-center justify-center'>
            <li className='text-white '>Home </li>
            <li><MdOutlineKeyboardArrowRight className='sm:text-[22px] text-[18px] text-white'/></li>
            <li className=' text-primYellow'> About</li>
           </ul>
        </div>
      </div>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-8">
      
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="h-[536px] w-[336px]">
                <Image
                src="/ab1.png"
                alt="Tacos"
                height={536}
                width={336}
                className="object-cover"
                />
            </div>
            <div className="mt-8 space-y-4">
                <Image
                src="/img3.png"
                alt="Chicken"
                height={271}
                width={309}
                className="object-cover h-[271px]"
                />
                <Image
                src="/ab2.png"
                alt="Salad"
                height={382}
                width={309}
                className=" object-cover"
                />
            </div>
          </div>
          
  
        
          <div className="flex flex-col justify-center">
            <h2 className="text-primYellow text-lg greatVibes mb-2">
              About us ____
            </h2>
            <h1 className="sm:text-5xl text-xl font-bold openSans text-gray-800 mb-4">
              Food is an important part of a balanced Diet
            </h1>
            <p className="text-gray-600 mb-6 text-[12px] sm:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              diam pellentesque bibendum non dui volutpat fringilla bibendum.
              Urna, elit augue urna, vitae feugiat pretium donec id elementum.
              Ultrices mattis vitae mus risus.
            </p>
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="bg-primYellow text-white sm:px-8 px-4 sm:py-3 py-1 inter sm:text-sm text-[12px] font-medium hover:bg-amber-400">
                Show more
              </button>
              <button className="flex items-center text-primYellow sm:text-lg text-sm gap-2">
                <span className="w-4 h-4 bg-primYellow rounded-full flex items-center justify-center">
                  <svg
                    className="w-2 h-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.25 6.75L19.5 12m0 0l-5.25 5.25M19.5 12H4.5"
                    ></path>
                  </svg>
                </span>
                Watch video
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-white flex flex-col items-center px-4 md:px-8">
      <div className="text-center my-2 sm:my-8">
        <h2 className="sm:text-5xl text-xl font-bold openSans text-gray-800 mb-4">Why Choose Us</h2>
        <p className="text-gray-600 inter text-[10px] sm:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam
          pellentesque bibendum non dui volutpat fringilla bibendum.
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <Image
          src='/abBanner.png'
          alt="Delicious food"
          width={800}
          height={500}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-8 text-center my-4 sm:my-12">

        <div className="flex flex-col items-center inter">
            <div className="text-gray-500 flex items-center justify-center mb-1 sm:mb-4">
                <PiChefHatThin size={80}/>
            </div>
            <h3 className="lg:text-xl text-sm font-semibold mb-2">Best Chef</h3>
            <p className="text-gray-600 lg:text-[20px] text-[12px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                diam pellentesque bibendum.
            </p>
        </div>

        <div className="flex flex-col items-center inter">
        <div className="text-gray-500 flex items-center justify-center mb-1 sm:mb-4">
            <BsCupHot size={80}/>
        </div>
          <h3 className="lg:text-xl text-sm font-semibold mb-2">120 Item Food</h3>
          <p className="text-gray-600 lg:text-[20px] text-[12px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            diam pellentesque bibendum.
          </p>
        </div>

        <div className="flex flex-col items-center inter">
          <div className="text-gray-500 flex items-center justify-center mb-1 sm:mb-4">
            <IoBodyOutline size={80}/>
          </div>
          <h3 className="lg:text-xl text-sm font-semibold mb-2">Clean Environment</h3>
          <p className="text-gray-600 lg:text-[20px] text-[12px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            diam pellentesque bibendum.
          </p>
        </div>
      </div>
    </div>
    <section className="flex flex-col items-center h-[85vh]">
      <div className="container absolute w-full text-center bg-primYellow opacity-90 py-[50px] sm:py-[100px]">
        <h2 className="md:text-4xl text-xl font-bold text-white openSans">Team Member</h2>
        <p className="text-white lg:text-lg sm:text-[16px] text-[12px] mb-12 inter text-wrap">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed pharetra dictum neque massa congue.
        </p>

      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4 relative sm:top-44 top-28">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white flex flex-col text-center w-[100px] sm:w-[170px] lg:w-[230px] xl:w-[300px] h-[200px] sm:h-[300px] lg:h-full"
            >
              <Image
                src='/team.png'
                alt={member.name}
                width={128}
                height={128}
                className="w-[312px] h-[320px] object-cover mb-4"
              />
              <h3 className="lg:text-xl sm:text-sm text-[10px] font-semibold mb-1 openSans">{member.name}</h3>
              <p className="text-gray-600 sm:mb-4 mb-1 lg:text-lg sm:text-sm text-[10px] inter">{member.role}</p>
              
            </div>
          ))}
        </div>
    </section>
    <div className="h-full w-full">
            <main className=" w-full justify-center text-zinc-800 flex items-center p-3 lg:p-6 xl:p-0">
            <div className="w-full lg:w-[1320px] flex-col p-2 sm:py-12">
                    <div className="w-full mt-2 text-start">
                        <h1 className="text-primYellow text-[18px] sm:text-[24px] lg:text-[28px] sm:leading-[32px] lg:leading-[40px] greatVibes tracking-wider">
                        Testimonials
                        </h1>
                        <h1 className="text-[28px] lg:text-[48px] font-bold leading-snug md:leading-tight text-primYellow openSans">
                            Wh<span className="text-zinc-800">at Our Clients are saying</span>
                        </h1>
                        
                    </div>
                    <div className="lg:mt-20 sm:mt-12 mt-4 flex justify-center">
                      <div className="w-[868px] h-full bg-white flex justify-center">
                          <Image src={'/card.png'} alt="" width={695} height={485} className="my-4"/>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Image src={'/Dot.png'} alt="" height={16} width={86} className="mt-4 sm:w-[86px] w-[35px]"/>
                    </div>
                </div>
            </main> 
        </div>
        <div className="py-6 p-3">
            <div className="text-center">
            <h1 className="text-[28px] lg:text-[48px] font-bold leading-snug md:leading-tight text-zinc-800 openSans">
            Our Food Menu</h1>
            <p className="text-gray-700 text-pretty lg:text-lg sm:text-[16px] text-[12px]">ignissimos magni harum culpa quasi a illum inventore, quae sequi odio libero deleniti doloribus error in.</p>
            </div>
            <div className="w-full flex justify-center items-center py-8">
                <div className="flex flex-col items-center">
                <MenuList category='main'/>
                <Link
                className="text-primYellow mt-6 border lg:text-lg sm:text-[16px] text-[12px] border-primYellow py-2 px-8 inter" 
                href={'/menu'}>View Menu
                </Link>
                </div>
            </div>
            
        </div>
      </div>

    );
  }
  