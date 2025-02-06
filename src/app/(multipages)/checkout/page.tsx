import ShipmentInfoSchema from "@/app/components/ShipmentInfo";
import { totalPrice } from "@/helpers/totalPrice";
import { Cart } from "@/types/Cart";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const CheckoutPage = async () => {
  const cartCookies = cookies().get("user_id")?.value;

  const url = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cart?user_id=${cartCookies}`
  );
  const cartData = await url.json();
  const cart = cartData.data;
  console.log(
    cart.map((item: Cart) => {
      const image = JSON.parse(item.image_url);
      return image.asset.url;
    })
  );

  const subtotal = cart.reduce(
    (total: number, item: Cart) =>
      total + item.product_price * item.product_quantity,
    0
  );
  // const discounted = subtotal * 0.75;
  // const tax = discounted * 0.10;
  // const shipping = 0;
  // const total = discounted+shipping+tax;
  const amount = totalPrice(subtotal);

  // const handleOrder = async () => {
  //   await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/addOrder`)
  // }
  return (
    <>
      <div className='bg-[url("/head.png")] h-[350px] w-full sm:bg-cover hidden md:flex justify-center items-center'>
        <div>
          <h1 className="openSans sm:text-[48px] text-[32px] text-white">
            Checkout Page
          </h1>
          <ul className="flex mt-4 inter sm:text-[20px] text-[16px] sm:leading-[28px] text-center items-center justify-center">
            <li className="text-white ">Home </li>
            <li>
              <MdOutlineKeyboardArrowRight className="sm:text-[22px] text-[18px] text-white" />
            </li>
            <li className=" text-primYellow"> Check Out</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center bg-white py-10 px-4">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 md:gap-8 space-y-3 sm:space-y-0">
          <ShipmentInfoSchema />
          <div className="bg-white p-2 border sm:p-6">
            <div className="space-y-4">
              {cart.map((item: Cart) => {
                const image = JSON.parse(item.image_url);
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={image.asset.url}
                        alt="Product"
                        width={64}
                        height={64}
                        className="w-14 h-14 rounded-md"
                      />
                      <div>
                        <h3 className="text-sm openSans text-gray-700">
                          {item.product_title}
                        </h3>
                        <p className="text-xs text-gray-500 inter">
                          150 gm net
                        </p>
                        <p className="text-xs text-gray-500 inter">
                          ${item.product_price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="pt-4 space-y-4 inter">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sub-total</span>
                  <span className="flex gap-2">
                    {" "}
                    <span className="font-medium text-gray-400 line-through gap-2">
                      ${subtotal.toFixed(2)}
                    </span>
                    <span className="font-medium text-gray-700">
                      ${amount.discounted.toFixed(2)}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-700">
                    {amount.shipping}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-gray-700">25%</span>
                </div>
                <div className="flex justify-between text-sm border-b pb-4">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium text-gray-700">
                    ${amount.tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between openSans mt-5 text-gray-800">
                  <span>Total</span>
                  <span>${amount.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link href={"./payment"}>
              <button className="mt-6 bg-primYellow text-white text-[16px] inter px-6 py-2  hover:bg-white hover:text-primYellow hover:border-primYellow hover:border w-full">
                Place an order
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
