import ShopPage from '@/app/components/ShopPage'
import { allProductsQuery } from '@/app/lib/queries'
import { client } from '@/sanity/lib/client'
import { FoodProduct } from '@/types/FoodProduct'
import React from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

async function page() {
  
    const products = await client.fetch<FoodProduct[]>(allProductsQuery)
    
  return (
    <div>
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
      <ShopPage products={products} />
        
      </div>
  )
}

export default page
