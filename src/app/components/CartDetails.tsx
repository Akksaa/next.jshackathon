"use client";
import { Cart } from "@/types/Cart";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function CartDetails({
  cookies,
  cart,
  // quantity,
  subtotal,
  shipping,
  total,
}: {
  cookies: string | undefined;
  cart: Cart[];
  // quantity: number;
  subtotal: number;
  shipping: number;
  total: number;
}) {
  const [cartItem, setCartItem] = useState<Cart[]>(cart);
  const [cartSubtotal, setSubtotal] = useState(subtotal);
  const [cartShipping, setShipping] = useState(shipping);
  const [CartTotal, setTotal] = useState(total);

  // const [Quantity, setQuantity] = useState(quantity);

  // const handleQuantityChange = (change: number) => {
  //   setQuantity((prev) => Math.max(1, prev + change));
  // };
  

  const HandleDelete = async (product_id: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/cart?user_id=${cookies}&product_id=${product_id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (data) {
        const url = await fetch(
          `http://localhost:3000/api/cart?user_id=${cookies}`
        );
        const cartData = await url.json();
        const cart = cartData.data;
        const subtotal = cart.reduce(
          (total: number, item: Cart) =>
            total + item.product_price * item.product_quantity,
          0
        );
        const shipping = 0;
        const total = subtotal + shipping;

        
        setCartItem(cart);
        setSubtotal(subtotal);
        setShipping(shipping);
        setTotal(total);
        toast.success("Item deleted successfully!");

        
      } else {
        console.error("Failed to delete item:", data.message);
        toast.error("Failed to delete item. Try again!");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("An error occurred while deleting the item.");
    }
  };

  return (
    <>
     <Toaster position="top-center"/>
      {cartItem.length > 0 ? (
        <>
       
          <div className="w-full flex justify-center items-center">
            <ul className="2xl:w-[1320px] w-full lg:px-12  px-4 py-8 my-8  rounded-lg shadow-md">
              <li className="hidden md:grid grid-cols-5 items-center w-full openSans text-gray-700 font-semibold text-sm border-b pb-4">
                <p className="col-span-2">Product</p>
                <p className="text-center">Price</p>
                <p className="text-center">Quantity</p>
                <p className="text-center">Total</p>
              </li>

              <div className="lg:space-y-6 space-y-3">
                {cartItem.map((item: Cart) => {
                  const image = JSON.parse(item.image_url);
                  return (
                    <li
                      key={item.id}
                      className="flex flex-col md:flex-row items-center md:justify-between bg-white p-4 rounded-md shadow-sm border border-gray-200"
                    >
                      <div className="flex items-center md:space-x-4 space-x-2 md:col-span-2">
                        <Image
                          src={image.asset.url}
                          alt={item.product_title}
                          width={120}
                          height={120}
                          className="w-[80px] h-[80px] rounded-md object-cover border"
                        />
                        <div>
                          <p className="md:text-[20px] text-sm font-medium text-gray-800 openSans">
                            {item.product_title}
                          </p>
                          <button
                            onClick={() => HandleDelete(item.product_id)}
                            className="md:text-sm text-[10px] text-red-500 inter hover:text-red-600 transition duration-150 ease-in-out mt-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-600 text-center md:text-[18px] text-sm openSans w-full md:w-[80px] mt-4 lg:mt-0">
                        ${item.product_price.toFixed(2)}
                      </p>

                      {/* <div className="flex items-center justify-center mt-4 lg:mt-0">
                        <div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center border border-gray-500">
                              <button
                                onClick={() => handleQuantityChange(-1)}
                                className="md:px-2 px-1 md:py-2 py-1 border-r border-gray-500 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="md:px-3 px-2 md:py-2 py-1">
                                {Quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(1)}
                                className="md:px-2 px-1 md:py-2 py-1 border-l border-gray-500 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div> */}
                       <p className="text-gray-600 text-center md:text-[18px] text-sm openSans w-full md:w-[80px] mt-4 lg:mt-0">
                        {item.product_quantity}x
                      </p>

                      <p className="text-gray-800 font-semibold md:text-[18px] text-sm openSans text-center w-full md:w-[80px]  lg:mt-0">
                        $
                        {(item.product_price * item.product_quantity).toFixed(
                          2
                        )}
                      </p>
                    </li>
                  );
                })}
              </div>
            </ul>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="2xl:w-[1320px] w-full  lg:p-12 md:p-8 p-4 md:flex">
              <div className="container mx-auto ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className=" ">
                    <h2 className="lg:text-xl text-lg font-bold mb-4 openSans">
                      Coupon Code
                    </h2>
                    <div className="border lg:p-6 p-3 rounded-sm ">
                      <p className="text-gray-500 mb-4 inter">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisque diam pellentesque bibendum non.
                      </p>
                      <div className="flex sm:flex-row flex-col space-y-2 items-center lg:space-x-4 space-x-2">
                        <input
                          type="text"
                          placeholder="Enter Here code"
                          className="flex-1 lg:p-3 p-1 border rounded-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-primYellow"
                        />
                        <button className="lg:px-6 px-3 lg:py-3 py-2 lg:text-[20px] text-[14px] bg-primYellow rounded-sm text-white font-bold openSans hover:bg-amber-400 transition">
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <h2 className="text-xl font-bold mb-4 openSans">
                      Total Bill
                    </h2>
                    <div className="space-y-4 border-2 p-4 rounded-sm shadow-sm">
                      <div className="flex justify-between inter">
                        <span className="text-gray-600">Cart Subtotal</span>
                        <span className="font-bold">
                          ${cartSubtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between inter">
                        <span className="text-gray-600">Shipping Charge</span>
                        <span className="font-bold">
                          ${cartShipping.toFixed(2)}
                        </span>
                      </div>
                      <hr className="border-t border-gray-300" />
                      <div className="flex justify-between text-lg openSans font-bold">
                        <span>Total Amount</span>
                        <span>${CartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    <Link href={"./checkout"}>
                      <button className="w-full mt-6 px-6 py-3 bg-primYellow text-white openSans font-bold rounded-sm hover:bg-amber-400 transition">
                        Proceed to Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-bold text-gray-800 openSans">
              Your Bag is Empty
            </h1>
            <p className="mt-4 text-gray-600 inter">
              Looks like you haven&apos;t added anything to your bag yet.
            </p>
            <div className="mt-6">
              <Link href="./products">
                <span className="px-6 py-3 openSans text-primYellow border-[1px] border-primYellow hover:text-white rounded-sm hover:bg-primYellow transition">
                  Continue Shopping
                </span>
              </Link>
            </div>
          </div>
          <Image
            src="/emptycart.png"
            alt="Empty Bag"
            width={288}
            height={288}
            className="w-72 mt-8"
          />
        </div>
      )}
    </>
  );
}

export default CartDetails;