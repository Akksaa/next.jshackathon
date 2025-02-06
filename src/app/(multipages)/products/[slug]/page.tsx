import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { oneProduct } from "@/app/lib/queries";
import { PortableText, PortableTextComponents } from "next-sanity";
import Image from "next/image";
import { ProductGallery } from "@/app/components/ProductGallery";
import Details from "@/app/components/Details";
import MinorDetails from "@/app/components/MinorDetails";
import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import MoreProducts from "@/app/components/MoreProducts";
import AddToCart from "@/app/components/AddToCart";
import ProductBadges from "@/app/components/ProductBadges";
import { FoodProduct } from "@/types/FoodProduct";
import Loading from "@/app/components/Loading";

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const ptComponents: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <div className="relative w-full h-48 my-4">
            <Image
              src={urlFor(value).url()}
              alt=""
              fill
              className="object-cover rounded"
            />
          </div>
        );
      },
    },
    block: {
      normal: ({ children }) => <p className="mb-4">{children}</p>,
    },
  };

  const product = await client.fetch<FoodProduct>(oneProduct, {
    slug: params.slug,
  });

  if (!product || !product.images || !product.name) {
    return <Loading />;
  }

  return (
    <>
      <div className='bg-[url("/head.png")] h-[350px] w-full sm:bg-cover flex justify-center items-center'>
        <div>
          <h1 className="openSans sm:text-[48px] text-[32px] text-white">
            Shop Details
          </h1>
          <ul className="flex mt-4 inter sm:text-[20px] text-[16px] sm:leading-[28px] text-center items-center justify-center">
            <li className="text-white ">Home </li>
            <li>
              <MdOutlineKeyboardArrowRight className="sm:text-[22px] text-[18px] text-white" />
            </li>
            <li className=" text-primYellow"> Shop Details</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-8">
              <ProductGallery
                images={product.images}
                productName={product.name}
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <ProductBadges product={product} />
            </div>
            <div className="space-y-6 mt-8">
              <h1 className="text-3xl font-bold text-gray-900 openSans">
                {product.name}
              </h1>
            </div>
            <div className="border-b-[1px]">
              <div className=" max-w-none">
                <div className=" text-gray-600 prose inter leading-5 text-[14px] md:text-[16px] lg:text-[20px] ">
                  {product.description && (
                    <PortableText
                      value={product.description}
                      components={ptComponents}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4">
              {product.isDiscounted && product.discountPrice ? (
                <div className="flex items-center gap-2 openSans">
                  <p className="text-2xl font-bold text-black">
                    {product.discountPrice.toFixed(2)}$
                  </p>
                  <p className="text-lg text-gray-400 line-through">
                    {product.price.toFixed(2)}$
                  </p>
                </div>
              ) : (
                <p className="text-2xl font-bold text-black openSans">
                  {product?.price?.toFixed(2)}$
                </p>
              )}
            </div>
            <AddToCart product={product} />

            <div className="pt-6 border-t border-gray-200 md:text-[20px] text-[17px]">
              <MinorDetails product={product} />
            </div>
          </div>
        </div>
        <Details product={product} />
        <MoreProducts />
      </div>
    </>
  );
}
