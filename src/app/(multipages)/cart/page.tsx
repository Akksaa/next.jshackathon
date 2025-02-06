import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { cookies } from "next/headers";
import { Cart } from "@/types/Cart";
import CartDetails from "@/app/components/CartDetails";
import Loading from "@/app/components/Loading";
import { totalPrice } from "@/helpers/totalPrice";

async function page() {
  const cartCookies = cookies().get("user_id")?.value;
  console.log(cartCookies);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const url = await fetch(`${API_URL}/api/cart?user_id=${cartCookies}`, {
    method: "GET",
    credentials: "include",
  });

  const cartData = await url.json();
  const cart = cartData.data;

  if (url.status == 500 || !cart) {
    alert("sign up to access your cart!");
  }
  console.log("cart", cart);
  const subtotal = cart.reduce(
    (total: number, item: Cart) =>
      total + item.product_price * item.product_quantity,
    0
  );

  const amount = totalPrice(subtotal);
  

  if (!cart) {
    return (
    <Loading/>
    );
  }

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
    total={amount.total}
    subtotal={subtotal}
    shipping={amount.shipping}
  />
    </div>
  );
}

export default page;
