import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { cookies } from "next/headers";
import { Cart } from "@/types/Cart";
// import Link from 'next/link'
import CartDetails from "@/app/components/CartDetails";
 

async function page() {
  const cartCookies = cookies().get("user_id")?.value;
  console.log(cartCookies); 
  
  

  const url = await fetch(
    `http://localhost:3000/api/cart?user_id=${cartCookies}`
  );
  if (url.status == 500) {
    alert('sign up to access your cart!')
  }
  const cartData = await url.json();
  const cart = cartData.data;
  const subtotal = cart.reduce(
    (total: number, item: Cart) =>
      total + item.product_price * item.product_quantity,
    0
  );
  const quantity = cart.reduce(
    (quantity:number, item:Cart) => 
      quantity + item.product_quantity,
  )
  const shipping = 0;
  const total = subtotal + shipping;


  return (
    <div>
      <div className='bg-[url("/head.png")] h-[350px] w-full sm:bg-cover hidden md:flex justify-center items-center'>
        <div>
          <h1 className="openSans sm:text-[48px] text-[32px] text-white">
            Your Bag
          </h1>
          <ul className="flex mt-4 inter sm:text-[20px] text-[16px] sm:leading-[28px] text-center items-center justify-center">
            <li className="text-white ">Home </li>
            <li>
              <MdOutlineKeyboardArrowRight className="sm:text-[22px] text-[18px] text-white" />
            </li>
            <li className=" text-primYellow">Shopping Bag</li>
          </ul>
        </div>
      </div>
      <CartDetails
        cookies={cartCookies}
        cart={cart}
        quantity={quantity}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
      />
    </div>
  );
}

export default page;
