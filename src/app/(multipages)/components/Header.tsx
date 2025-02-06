import Link from "next/link";
import React from "react";
import { CiUser, CiBag1, CiMenuBurger } from "react-icons/ci";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductSearch from "@/app/components/ProductSearch";
import { allProductsQuery } from "@/app/lib/queries";
import { client } from "@/sanity/lib/client";
import { FoodProduct } from "@/types/FoodProduct";

async function Header() {
  const products = await client.fetch<FoodProduct[]>(allProductsQuery);
  console.log(products);
  return (
    <div className="">
      <div className="w-full h-[90px] flex justify-center items-center bg-black p-5">
        <header className="w-full flex items-center justify-between lg:w-[1320px]  text-white">
          <div>
            <a
              href="./"
              className="text-2xl font-bold openSans text-[24px] leading-[32px] flex"
            >
              <p className="text-primYellow">Food</p>
              <p className="text-white">tuck</p>
            </a>
          </div>
          <div>
            <ul className="xl:flex hidden space-x-6 text-[16px] leading-[24px] inter">
              <li>
                <Link
                  href="/"
                  className="relative transition-colors duration-300"
                >
                  <span className="relative group">
                    Home
                    <span className="absolute left-0 bottom-0  w-full h-[2px] bg-primYellow transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="./menu"
                  className="relative transition-colors duration-300"
                >
                  <span className="relative group">
                    Menu
                    <span className="absolute left-0 bottom-0  w-full h-[2px] bg-primYellow transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="../blogs"
                  className="relative transition-colors duration-300"
                >
                  <span className="relative group">
                    Blogs
                    <span className="absolute left-0 bottom-0  w-full h-[2px] bg-primYellow transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </Link>
              </li>
              <HoverCard>
                <HoverCardTrigger>
                  <li>
                    <p className="relative transition-colors duration-300">
                      <span className="relative group">
                        Pages
                        <span className="absolute left-0 bottom-0  w-full h-[2px] bg-primYellow transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                      </span>
                    </p>
                  </li>
                </HoverCardTrigger>
                <HoverCardContent className="w-[150%] p-3 bg-black opacity-85 border-primYellow">
                  <ul className="text-white inter text-[16px] leading-[24px]">
                    <li className="border-b-[1px] border-zinc-500 py-2">
                      <Link href={"./signup"}>Sign Up Page</Link>{" "}
                    </li>
                    <li className="flex gap-1 border-b-[1px] border-zinc-500 py-2">
                      <Link href={"./login"}> Log In Page</Link>{" "}
                    </li>
                    <li className="border-b-[1px] border-zinc-500 py-2">
                      <Link href={"./faq"}>FAQ Page</Link>
                    </li>
                    <li className="border-b-[1px] border-zinc-500 py-2">
                      <Link href={"./checkout"}>Check Out Page</Link>
                    </li>
                    <li className="border-b-[1px] border-zinc-500 py-2">
                      <Link href={"./chefs"}>Our Chefs</Link>
                    </li>
                    <li className="py-2">
                      <Link href={"./error"}>404 Error Page</Link>{" "}
                    </li>
                  </ul>
                </HoverCardContent>
              </HoverCard>
              <li>
                <Link
                  href="../about"
                  className="relative transition-colors duration-300"
                >
                  <span className="relative group">
                    About
                    <span className="absolute left-0 bottom-0  w-full h-[2px] bg-primYellow transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="../products"
                  className="relative transition-colors duration-300"
                >
                  <span className="relative group">
                    Shop
                    <span className="absolute left-0 bottom-0  w-full h-[2px] bg-primYellow transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="../signup"
                  className="group flex items-center  transition-colors duration-300"
                >
                  <span>Sign up</span>
                  <span className="inline-block transform translate-x-0 opacity-0 group-hover:translate-x-2 group-hover:opacity-100 group-hover:text-primYellow transition-all duration-300">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-2 relative">
            <div className="hidden sm:flex">
              <ProductSearch products={products} />
            </div>
            <Link href={"/profile"}>
              <CiUser
                size={28}
                className="inline-block hover:text-primYellow transition-colors duration-300 hover:animate-bounce"
              />
            </Link>

            <div className="hidden xl:flex mt-1">
              <Link
                href="../cart"
                className="inline-block hover:text-primYellow transition-colors duration-300 hover:animate-bounce"
              >
                <CiBag1 size={28} />
              </Link>
            </div>
            <Sheet>
              <SheetTrigger>
                <div className="flex mt-1 xl:hidden items-center">
                  <CiMenuBurger size={28} />
                </div>
              </SheetTrigger>
              <SheetContent className="p-3 bg-black opacity-85 text-white border border-black">
                <SheetHeader>
                  <SheetTitle className="mt-4">
                    <Link
                      href={"./"}
                      className="sm:text-2xl font-bold openSans text-[24px] leading-[32px] flex justify-center"
                    >
                      <p className="text-primYellow">Food</p>
                      <p className="text-white">tuck</p>
                    </Link>
                    <ul className="text-white text-center space-y-3 sm:space-y-6 mt-8 text-[20px] leading-[24px] inter">
                      <li>
                        <Link href={"./"} className="hover:text-primYellow">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"../menu"}
                          className="hover:text-primYellow"
                        >
                          Menu
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"../blogs"}
                          className="hover:text-primYellow"
                        >
                          Blog
                        </Link>
                      </li>
                      <li>
                        <p className="hover:text-primYellow cursor-pointer">
                          Pages
                        </p>
                      </li>
                      <li>
                        <Link href="../about" className="hover:text-primYellow">
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"./products"}
                          className="hover:text-primYellow"
                        >
                          Shop
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"./signup"}
                          className="hover:text-primYellow"
                        >
                          Sign up
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"../cart"}
                          className="hover:text-primYellow"
                        >
                          Bag
                        </Link>
                      </li>
                    </ul>
                  </SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
