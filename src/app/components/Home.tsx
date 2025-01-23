import React from "react";
import { CiBag1, CiUser } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import { AiOutlineCheck } from "react-icons/ai";
import { PiHamburgerThin, PiCookieLight, PiWineLight } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
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
import ProductSearch from "./ProductSearch";
import { client } from "@/sanity/lib/client";
import { FoodProduct } from "@/types/FoodProduct";
import { allProductsQuery, menuProducts } from "../lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { BlogPost } from "@/types/Blog";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { RiAccountCircle2Line } from "react-icons/ri";

export default async function Home() {
  const products = await client.fetch<FoodProduct[]>(allProductsQuery);
  const bestSellers = products.filter(
    (product) => product.tags && product.tags.includes("best seller")
  );
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

  if (bestSellers.length === 0) {
    return null;
  }

  const main = await menuProducts("main");
  const desserts = await menuProducts("desserts");

  return (
    <>
      <div className=" h-full w-full bg-cover bg-[url('/bgHome.png')]">
        <div className="w-full h-full xl:p-0 sm:p-7 p-4">
          <div className="w-full flex justify-center pt-6">
            <header className="w-full min-h-[100px] max-w-[1320px] h-[87px] bg-transparent text-white">
              <Link
                href={"./"}
                className="text-2xl font-bold openSans text-[24px] leading-[32px] flex justify-center"
              >
                <p className="text-primYellow">Food</p>
                <p className="text-white">tuck</p>
              </Link>
              <nav className="container mx-auto flex flex-wrap items-center lg:justify-between justify-center pt-4">
                <ul className="lg:flex hidden space-x-6 text-[16px] leading-[24px] inter">
                  <li>
                    <Link
                      href="./"
                      className="relative transition-colors duration-300"
                    >
                      <span className="relative group">
                        Home
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primYellow transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="./menu"
                      className="relative  transition-colors duration-300"
                    >
                      <span className="relative group">
                        Menu
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primYellow transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                    rel="preload"
                      href="./blogs"
                      className="relative transition-colors duration-300"
                    >
                      <span className="relative group">
                        Blogs
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primYellow transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <HoverCard>
                      <HoverCardTrigger>
                        <p
                          rel="preload"
                          className="relative transition-colors duration-300"
                        >
                          <span className="relative group">
                            Pages
                            <span className="absolute left-0 bottom-0  w-full h-[2px] bg-primYellow transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                          </span>
                        </p>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-[150%] p-3 bg-black opacity-85 border-primYellow">
                        <ul className="text-white inter text-[16px] leading-[24px]">
                          <li className="border-b-[1px] border-zinc-500 py-2">
                            <Link rel="preload" href={"./signup"}>Sign Up Page</Link>{" "}
                          </li>
                          <li className="flex gap-1 border-b-[1px] border-zinc-500 py-2">
                            <Link rel="preload" href={"./login"}> Log In Page</Link>{" "}
                          </li>
                          <li className="border-b-[1px] border-zinc-500 py-2">
                            <Link rel="preload" href={"./faq"}>FAQ Page</Link>{" "}
                          </li>
                          <li className="border-b-[1px] border-zinc-500 py-2">
                            <Link rel="preload" href={"./checkout"}>Check Out Page</Link>
                          </li>
                          <li className="border-b-[1px] border-zinc-500 py-2">
                            <Link rel="preload" href={"./chefs"}>Our Chefs</Link>
                          </li>
                          <li className="py-2">
                            <Link rel="preload" href={"./error"}>404 Error Page</Link>{" "}
                          </li>
                        </ul>
                      </HoverCardContent>
                    </HoverCard>
                  </li>
                  <li>
                    <Link
                    rel="preload"
                      href="/about"
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
                    rel="preload"
                      href="/products"
                      className="relative  transition-colors duration-300"
                    >
                      <span className="relative group">
                        Shop
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primYellow transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                    rel="preload"
                      href="./signup"
                      className="group flex items-center  transition-colors duration-300"
                    >
                      <span>Sign up</span>
                      <span className="inline-block transform translate-x-0 opacity-0 group-hover:translate-x-2 group-hover:opacity-100 group-hover:text-primYellow transition-all duration-300">
                        →
                      </span>
                    </Link>
                  </li>
                </ul>
                <div className="flex items-center gap-2 mt-4 sm:mt-0 relative">
                  <ProductSearch products={products} />
                  <div className="flex items-center gap-2">
                    <HoverCard>
                      <HoverCardTrigger>
                        <CiUser
                          size={24}
                          className="inline-block hover:text-primYellow transition-colors duration-300 hover:animate-bounce"
                        />
                      </HoverCardTrigger>
                      <HoverCardContent 
                      rel="preload"
                      className="w-[150%] p-3 bg-black opacity-85 border-primYellow">
                        <ul className="text-white inter text-[16px] leading-[24px]">
                          <li className="border-b-[1px] border-zinc-500 py-2">
                            <Link href={"./signup"}>Sign Up</Link>{" "}
                          </li>
                          <li className="flex gap-1 border-b-[1px] border-zinc-500 py-2">
                            <Link href={"/"}> My Account</Link>{" "}
                          </li>
                          <li className="border-b-[1px] border-zinc-500 py-2">
                            <Link href={"/"}>My Orders</Link>{" "}
                          </li>
                          <li className="py-2">
                            <Link href={"/"}>Log Out</Link>{" "}
                          </li>
                        </ul>
                      </HoverCardContent>
                    </HoverCard>
                    <div className="hidden lg:flex mt-1">
                      <a
                        href="./cart"
                        className="inline-block hover:text-primYellow transition-colors duration-300 hover:animate-bounce"
                      >
                        <CiBag1 size={24} />
                      </a>
                    </div>
                  </div>

                  <Sheet>
                    <SheetTrigger>
                      <div rel="preload" className="flex lg:hidden items-center">
                        <CiMenuBurger size={24} />
                      </div>
                    </SheetTrigger>
                    <SheetContent rel="preload" className="p-3 bg-black opacity-85 text-white border border-black">
                      <SheetHeader>
                        <SheetTitle className="mt-4">
                          <Link
                            rel="preload"
                            href={"./"}
                            className="text-2xl font-bold openSans text-[24px] leading-[32px] flex justify-center"
                          >
                            <p className="text-primYellow">Food</p>
                            <p className="text-white">tuck</p>
                          </Link>
                          <ul className="text-white space-y-3 mt-8 text-[16px] leading-[24px] inter">
                            <li>
                              <Link
                                rel="preload"
                                href={"./"}
                                className="hover:text-primYellow"
                              >
                                Home
                              </Link>
                            </li>
                            <li>
                              <Link
                                rel="preload"
                                href={"./menu"}
                                className="hover:text-primYellow"
                              >
                                Menu
                              </Link>
                            </li>
                            <li>
                              <Link
                                rel="preload"
                                href={"./blogs"}
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
                              <Link
                                rel="preload"
                                href="./about"
                                className="hover:text-primYellow"
                              >
                                About
                              </Link>
                            </li>
                            <li>
                              <Link
                                rel="preload"
                                href="./products"
                                className="hover:text-primYellow"
                              >
                                Shop
                              </Link>
                            </li>
                            <li>
                              <Link
                                rel="preload"
                                href="./signup"
                                className="hover:text-primYellow"
                              >
                                Sign up
                              </Link>
                            </li>
                            <li>
                              <Link
                                rel="preload"
                                href={"./cart"}
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
              </nav>
            </header>
          </div>

          <main className=" w-full justify-center pt-12 text-white flex items-center">
            <div className="w-full lg:w-[1320px] md:flex-row flex flex-col-reverse lg:gap-7 justify-between">
              <div className="sm:w-[472px] lg:mt-32 mt-8">
                <h1 className="text-primYellow text-[18px] sm:text-[24px] lg:text-[32px] sm:leading-[32px] lg:leading-[40px] greatVibes tracking-wider">
                  Its Quick & Amusing!
                </h1>
                <h1 className="text-[28px] md:text-[36px] lg:text-[60px] font-bold leading-snug md:leading-tight text-primYellow openSans">
                  Th
                  <span className="text-white">
                    e Art of speed food Quality
                  </span>
                </h1>
                <p className="mt-4 text-[14px] lg:text-[16px] inter text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Varius sed pharetra dictum neque massa congue.
                </p>
                <Link href={"./menu"}>
                  <button className="mt-8 text-[14px] lg:text-[16px] inter leading-[24px] bg-primYellow text-white px-5 lg:px-7 py-2 lg:py-3 rounded-full hover:bg-transparent hover:text-primYellow transition-colors duration-300 hover:border-primYellow hover:border">
                    See Menu
                  </button>
                </Link>
              </div>
              <div className="mt-6 sm:mt-0 ">
                <Image
                  rel="preload"
                  priority
                  src={"/home.png"}
                  alt=""
                  width={878}
                  height={670}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="h-full w-full">
        <main className=" bg-black w-full justify-center text-white flex items-center p-3 lg:p-6 xl:p-2">
          <div className="w-full lg:w-[1320px] md:flex-row flex flex-col-reverse lg:gap-7 justify-between">
            <div className="sm:w-[472px] lg:mt-16 mt-6">
              <h1 className="text-primYellow text-[18px] sm:text-[24px] lg:text-[32px] sm:leading-[32px] lg:leading-[40px] greatVibes tracking-wider">
                About us
              </h1>
              <h1 className="text-[28px] md:text-[36px] lg:text-[60px] font-bold leading-snug md:leading-tight text-primYellow openSans">
                We
                <span className="text-white">
                  {" "}
                  Create the best foody product
                </span>
              </h1>
              <p className="mt-4 sm:mt-2 lg:mt-4 text-[14px] sm:text-[12px] lg:text-[16px] inter text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                diam pellentesque bibendum non dui volutpat fringilla bibendum.
                Urna, elit augue urna, vitae feugiat pretium donec id elementum.
                Ultrices mattis sed vitae mus risus. Lacus nisi, et ac dapibus
                sit eu velit in consequat.{" "}
              </p>
              <ul className="space-y-2 mt-4 text-[14px] sm:text-[12px] lg:text-[16px] inter">
                <li className="flex items-center gap-2">
                  <AiOutlineCheck /> Lacus nisi, et ac dapibus sit eu velit in
                  consequat.
                </li>
                <li className="flex items-center gap-2">
                  <AiOutlineCheck />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  dapibus
                </li>
                <li className="flex items-center gap-2">
                  <AiOutlineCheck />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
              </ul>
              <Link href={"./about"}>
                <button className="mt-8 sm:mt-3 lg:mt-8 text-[14px] sm:text-[12px] lg:text-[16px] inter leading-[24px] bg-primYellow text-white px-3 sm:px-5 lg:px-7 py-1 sm:py-2 lg:py-3 rounded-full hover:bg-transparent hover:text-primYellow transition-colors duration-300 hover:border-primYellow hover:border">
                  Read More
                </button>
              </Link>
            </div>
            <div className="lg:mt-20 sm:mt-12 flex justify-center sm:justify-normal">
              <div className="sm:grid grid-cols-1 grid-rows-2 space-y-2 sm:space-y-3">
                <Image
                  src={"/home1.png"}
                  alt=""
                  width={660}
                  height={330}
                  className=""
                />
                <div className="grid grid-cols-2 grid-rows-1 space-x-2 sm:space-x-3">
                  <Image
                    src={"/home2.png"}
                    alt=""
                    width={322}
                    height={195}
                    className=""
                  />
                  <Image
                    src={"/home3.png"}
                    alt=""
                    width={322}
                    height={195}
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="h-full w-full">
        <main className="bg-black w-full justify-center text-white flex items-center p-3 lg:p-6 xl:p-0">
          <div className="w-full lg:w-[1320px] flex-col ">
            <div className="w-full mt-6 text-center">
              <h1 className="text-primYellow text-[18px] sm:text-[24px] lg:text-[32px] sm:leading-[32px] lg:leading-[40px] greatVibes tracking-wider">
                Food Category
              </h1>
              <h1 className="text-[28px] md:text-[36px] lg:text-[60px] font-bold leading-snug md:leading-tight text-primYellow openSans">
                Ch<span className="text-white">oose Food Item</span>
              </h1>
            </div>
            <div className="lg:mt-20 mt-8 ">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {bestSellers.map((product) => (
                  <Link
                    href={`/products/${product.slug.current}`}
                    key={product._id}
                    className="block group"
                  >
                    <div className="w-full">
                      <div className="tracking-wide">
                        <div className="relative w-full aspect-square overflow-hidden">
                          <div className="absolute inset-0 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
                            <Image
                              src={urlFor(product.images[0]).url() || ""}
                              alt={product.name}
                              fill
                              sizes="300px"
                              className="object-cover"
                            />
                          </div>

                          {product.images[1] && (
                            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                              <Image
                                src={urlFor(product.images[1]).url() || ""}
                                alt={product.name}
                                fill
                                sizes="300px"
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>

                        <h1 className="mt-2 group-hover:text-primYellow transition-colors duration-200 font-bold inter text-[18px] text-zinc-300">
                          {product.name}
                        </h1>

                        <div className="mt-4">
                          {product.isDiscounted && product.discountPrice ? (
                            <div className="flex items-center inter gap-2">
                              <p className="text-[16px] font-normal text-primYellow">
                                {product.discountPrice.toFixed(2)}$
                              </p>
                              <p className="text-[16px] font-normal text-gray-300 line-through">
                                {product.price.toFixed(2)}$
                              </p>
                            </div>
                          ) : (
                            <p className="text-[16px] font-normal text-primYellow inter">
                              {product.price.toFixed(2)}$
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="h-full w-full">
        <main className=" bg-black w-full justify-center text-white flex items-center p-3 lg:p-6 xl:p-2">
          <div className="w-full lg:w-[1320px] md:flex-row gap-4 flex flex-col-reverse md:justify-between justify-center mt-8 py-8 lg:py-16">
            <div className="lg:mt-18 sm:mt-12 md:mt-0 ">
              <div className="grid grid-cols-2 grid-rows-2 space-y-2 sm:space-y-3 space-x-2 md:space-x-3 w-full">
                <div className="flex items-end">
                  <Image
                    src={"/img1.png"}
                    alt=""
                    width={362}
                    height={356}
                    className=" sm:mt-0 hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="flex items-end">
                  <Image
                    src={"/img2.png"}
                    alt=""
                    width={281}
                    height={231}
                    className=" hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="grid grid-cols-3 col-span-3 md:col-span-2 lg:col-span-3 grid-rows-1 space-x-2 sm:space-x-3">
                  <div>
                    <Image
                      src={"/img3.png"}
                      alt=""
                      width={244}
                      height={306}
                      className="hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div>
                    <Image
                      src={"/img4.png"}
                      alt=""
                      width={221}
                      height={226}
                      className="hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="space-y-2 sm:space-y-3 ">
                    <Image
                      src={"/img5.png"}
                      alt=""
                      width={161}
                      height={168}
                      className="hover:scale-105 transition-transform duration-200"
                    />
                    <Image
                      src={"/img6.png"}
                      alt=""
                      width={161}
                      height={168}
                      className="hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:w-[490px] lg:w-[530px] md:w-full w-full lg:mt-24 mt-6 ">
              <h1 className="text-primYellow text-[18px] sm:text-[24px] lg:text-[32px] sm:leading-[32px] lg:leading-[40px] greatVibes tracking-wider">
                Why Choose us
              </h1>
              <h1 className="text-[28px] md:text-[36px] lg:text-[60px] font-bold leading-snug md:leading-tight text-primYellow openSans">
                Ex
                <span className="text-white">
                  tra ordinary taste And Experience{" "}
                </span>
              </h1>
              <p className="mt-4 sm:mt-2 lg:mt-4 text-[14px] sm:text-[12px] lg:text-[16px] inter text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                diam pellentesque bibendum non dui volutpat fringilla bibendum.
                Urna, elit augue urna, vitae feugiat pretium donec id elementum.
                Ultrices mattis sed vitae mus risus. Lacus nisi, et ac dapibus
                sit eu velit in consequat.{" "}
              </p>
              <ul className="flex w-full justify-center lg:justify-start gap-4 lg:gap-8 lg:mt-8 mt-4">
                <li>
                  <div className="bg-primYellow flex items-center justify-center lg:py-3 py-1 lg:px-3 px-1 hover:scale-105 transition-transform duration-200">
                    <PiHamburgerThin size={56} />
                  </div>
                  <p className="inter lg:text-[18px] text-[12px] text-white text-center mt-1">
                    Fast Food
                  </p>
                </li>
                <li>
                  <div className="bg-primYellow flex items-center justify-center lg:py-3 py-1 lg:px-3 px-1 hover:scale-105 transition-transform duration-200">
                    <PiCookieLight size={56} />
                  </div>
                  <p className="inter lg:text-[18px] text-[12px] text-white text-center mt-1">
                    Lunch
                  </p>
                </li>
                <li>
                  <div className="bg-primYellow flex items-center justify-center lg:py-3 py-1 lg:px-3 px-1 hover:scale-105 transition-transform duration-200">
                    <PiWineLight size={56} />
                  </div>
                  <p className="inter lg:text-[18px] text-[12px] text-white text-center mt-1">
                    Dinner
                  </p>
                </li>
              </ul>
              <div className="lg:mt-8 mt-4 px-2 md:px-0 flex justify-center lg:justify-start">
                <Image
                  src={"/exp.png"}
                  alt="exp"
                  width={374}
                  height={374}
                  className="w-auto h-auto"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="sm:h-[470px] h-full w-full flex justify-center items-center bg-cover bg-[url('/boxbg.png')]">
        <div className="p-5">
          <Image src={"/box2.png"} alt="" width={1320} height={247} />
        </div>
      </div>
      <div className="h-full w-full">
        <main className="bg-black w-full justify-center text-white flex items-center p-3 lg:p-6 xl:p-0">
          <div className="w-full lg:w-[1320px] flex-col p-2 py-9">
            <div className="w-full mt-6 text-center">
              <h1 className="text-primYellow text-[18px] sm:text-[24px] lg:text-[32px] sm:leading-[32px] lg:leading-[40px] greatVibes tracking-wider">
                Choose & Pick
              </h1>
              <h1 className="text-[28px] md:text-[36px] lg:text-[60px] font-bold leading-snug md:leading-tight text-primYellow openSans">
                Fr<span className="text-white">om Our Menu</span>
              </h1>
              <ul className="md:flex hidden justify-around inter text-[20px] text-white mt-12">
                <li className="hover:text-primYellow cursor-pointer">
                  Breakfast
                </li>
                <li className="hover:text-primYellow cursor-pointer">Lunch</li>
                <li className="hover:text-primYellow cursor-pointer">Dinner</li>
                <li className="hover:text-primYellow cursor-pointer">
                  Dessert
                </li>
                <li className="hover:text-primYellow cursor-pointer">Drink</li>
                <li className="hover:text-primYellow cursor-pointer">Snack</li>
                <li className="hover:text-primYellow cursor-pointer">Soups</li>
              </ul>
            </div>
            <div className="mt-8 flex justify-evenly items-center">
              <Image
                src={"/img7.png"}
                alt=""
                width={366}
                height={366}
                className="hidden lg:flex"
              />
              <div className="flex flex-col gap-4 pb-4 ">
                {desserts.map((product: FoodProduct) => (
                  <Link
                    href={`/products/${product.slug.current}`}
                    key={product._id}
                    className="group"
                  >
                    <div className="flex md:gap-4 gap-2">
                      <div className="relative aspect-square md:w-[80px] w-[40px] flex rounded-sm">
                        <Image
                          src={urlFor(product.images[0]).url() || ""}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-2 md:text-lg text-[10px] font-medium text-gray-300 truncate group-hover:text-primYellow transition-colors">
                        {product.name}
                        <span>
                          {product.isDiscounted && product.discountPrice ? (
                            <div className="flex items-center gap-2 openSans">
                              <p className="openSans lg:text-[14px] text-[8px] lg:leading-[32px] text-primYellow py-1 sm:py-0">
                                {product.discountPrice.toFixed(2)}$
                              </p>
                            </div>
                          ) : (
                            <p className="openSans lg:text-[14px] text-[8px] lg:leading-[32px] text-primYellow py-1 sm:py-0">
                              {product.price.toFixed(2)}$
                            </p>
                          )}
                        </span>
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-4 pb-4 ">
                {main.map((product: FoodProduct) => (
                  <Link
                    href={`/products/${product.slug.current}`}
                    key={product._id}
                    className="group"
                  >
                    <div className="flex md:gap-4 gap-2">
                      <div className="relative aspect-square md:w-[80px] w-[40px] flex rounded-lg">
                        <Image
                          src={urlFor(product.images[0]).url() || ""}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-2 md:text-lg text-[10px] font-medium text-gray-300 truncate group-hover:text-primYellow transition-colors">
                        {product.name}
                        <span>
                          {product.isDiscounted && product.discountPrice ? (
                            <div className="flex items-center gap-2 openSans">
                              <p className="openSans lg:text-[14px] text-[8px] lg:leading-[32px] text-primYellow py-1 sm:py-0">
                                {product.discountPrice.toFixed(2)}$
                              </p>
                            </div>
                          ) : (
                            <p className="openSans lg:text-[14px] text-[8px] lg:leading-[32px] text-primYellow py-1 sm:py-0">
                              {product.price.toFixed(2)}$
                            </p>
                          )}
                        </span>
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="h-full w-full">
        <main className="bg-black w-full justify-center text-white flex items-center p-3 lg:p-6 xl:p-0">
          <div className="w-full lg:w-[1320px] flex-col p-2">
            <div className="w-full mt-6 text-center">
              <h1 className="text-primYellow text-[18px] sm:text-[24px] lg:text-[32px] sm:leading-[32px] lg:leading-[40px] greatVibes tracking-wider">
                Chefs
              </h1>
              <h1 className="text-[28px] md:text-[36px] lg:text-[60px] font-bold leading-snug md:leading-tight text-primYellow openSans">
                Me<span className="text-white">et Our Chef</span>
              </h1>
            </div>
            <div className="lg:mt-20 sm:mt-12 mt-4">
              <ul className="space-x-3 w-full flex">
                <li>
                  <Image src={"/chef1.png"} alt="" width={312} height={391} />
                </li>
                <li>
                  <Image src={"/chef2.png"} alt="" width={312} height={391} />
                </li>
                <li>
                  <Image
                    src={"/chef3.png"}
                    alt=""
                    width={312}
                    height={391}
                    className=""
                  />
                </li>
                <li>
                  <Image
                    src={"/chef4.png"}
                    alt=""
                    width={312}
                    height={391}
                    className="sm:flex hidden"
                  />
                </li>
              </ul>
            </div>
            <div className="flex justify-center mt-10">
              <Link href={"../chefs"}>
                <button className="inter sm:text-[16px] text-[10px] sm:px-5 px-3 sm:py-2 py-1 border-[1px] rounded-full border-primYellow hover:bg-primYellow hover:text-black transition-colors duration-200">
                  See More
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
      <div className="h-full w-full">
        <main className="bg-black w-full justify-center text-white flex items-center p-3 lg:p-6 xl:p-0">
          <div className="w-full lg:w-[1320px] flex-col p-2 sm:py-12">
            <div className="w-full mt-6 text-start">
              <h1 className="text-primYellow text-[18px] sm:text-[24px] lg:text-[32px] sm:leading-[32px] lg:leading-[40px] greatVibes tracking-wider">
                Testimonials
              </h1>
              <h1 className="text-[28px] md:text-[36px] lg:text-[60px] font-bold leading-snug md:leading-tight text-primYellow openSans">
                Wh<span className="text-white">at Our Clients are saying</span>
              </h1>
            </div>
            <div className="lg:mt-20 sm:mt-12 mt-4 flex justify-center">
              <div className="w-[868px] h-full bg-white flex justify-center">
                <Image
                  src={"/card.png"}
                  alt=""
                  width={695}
                  height={485}
                  className="my-4"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src={"/Dot.png"}
                alt=""
                height={16}
                width={86}
                className="mt-4 sm:w-[86px] w-[35px]"
              />
            </div>
          </div>
        </main>
      </div>
      <div className="bg-black flex justify-center sm:h-[560px] w-full bg-[url('/box3.png')] bg-cover h-full">
        {/* <Image
          src={"/box3.png"}
          alt=""
          width={1920}
          height={560}
          className="sm:py-12 py-4"
        /> */}
      </div>
      <div className="h-full w-full">
        <main className="bg-black w-full justify-center text-white flex items-center p-3 lg:p-6 xl:p-0">
          <div className="w-full lg:w-[1320px] flex-col p-2 sm:py-12">
            <div className="w-full mt-6 text-center">
              <h1 className="text-primYellow text-[18px] sm:text-[24px] lg:text-[32px] sm:leading-[32px] lg:leading-[40px] greatVibes tracking-wider">
                Blog Posts
              </h1>
              <h1 className="text-[28px] md:text-[36px] lg:text-[60px] font-bold leading-snug md:leading-tight text-primYellow openSans">
                La<span className="text-white">test News & Blogs</span>
              </h1>
            </div>
            <div className=" sm:mt-12 mt-4">
              <ul className="space-x-2 w-full flex">
                <div className="md:flex space-y-2 md:space-y-0 gap-3 w-[100%]">
                  {blogs.map((blog: BlogPost) => (
                    <div key={blog.title}>
                      <article className="bg-black overflow-hidden border">
                        <div className="relative lg:h-[380px] sm:h-[220px] h-[180px] w-full">
                          <Image
                            src={urlFor(blog.images[0]).url()}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="sm:py-4 py-2 sm:px-4 px-1">
                          <div className="mb-2 flex gap-1">
                            <span className="flex gap-1 items-center ">
                              <IoCalendarNumberSharp className="text-primYellow text-[8px] sm:text-[20px]" />{" "}
                              <span className="inter text-zinc-300 text-[8px] sm:text-[16px]">
                                {new Date(blog._createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}{" "}
                                /{" "}
                              </span>
                            </span>
                            <span className="flex gap-1 items-center">
                              <RiAccountCircle2Line className="text-primYellow text-[8px] sm:text-[20px]" />{" "}
                              <span className="inter text-zinc-300 text-[8px] sm:text-[16px]">
                                {blog.author}
                              </span>
                            </span>
                          </div>
                          <h2 className="text-[14px] sm:text-[24px] font-normal openSans mb-2 hover:text-primYellow">
                            {blog.title}
                          </h2>
                          <div className="inter sm:text-[16px] text-[8px] font-normal text-zinc-300 sm:leading-6">
                            {blog.description1 &&
                              (blog.description1.split(" ").length > 100
                                ? blog.description1
                                    .split(" ")
                                    .slice(0, 20)
                                    .join(" ") + "..."
                                : blog.description1)}
                          </div>
                          <div>
                            <Link href={`/blogs/${blog.slug.current}`}>
                              <button className="text-primYellow text-[8px] sm:text-[16px] inter bg-transparent border mt-2 border-primYellow rounded-md sm:px-4 px-2 sm:py-2 py-1">
                                Read More
                              </button>
                            </Link>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
