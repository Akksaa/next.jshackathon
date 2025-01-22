import React from "react";
import Link from "next/link";
import { menuProducts } from "../lib/queries";
import { FoodProduct } from "@/types/FoodProduct";

async function MenuList(category: { category: string }) {

  const products = await menuProducts(category.category);
  if (!products) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="mt-2 md:mt-0">
        {products.map((product: FoodProduct) => (
          <Link href={`/products/${product.slug.current}`} key={product._id}>
            <div className="flex w-full justify-between items-start lg:items-center border-b-[1px] border-zinc-200">
              <div className="md:space-y-1 xl:py-4 sm:py-2 py-1">
                <h1 className="openSans lg:text-[24px] text-[18px] lg:leading-[32px] text-zinc-700 cursor-pointer hover:text-primYellow transition-colors duration-200">
                  {product.name}
                </h1>
                <p className="inter lg:text-[16px] text-[12px] lg:leading-6 text-zinc-600">
                  {product.ingredients?.join(", ")}
                </p>
                <p className="inter lg:text-[16px] text-[12px] lg:leading-6 text-zinc-600">
                  {product.nutritionalInfo?.calories} CAL
                </p>
              </div>
              <div className="mt-4">
                {product.isDiscounted && product.discountPrice ? (
                  <div className="flex items-center gap-2 openSans">
                    <p className="openSans lg:text-[24px] text-[18px] lg:leading-[32px] text-primYellow py-1 sm:py-0">
                      {product.discountPrice.toFixed(2)}$
                    </p>
                  </div>
                ) : (
                  <p className="openSans lg:text-[24px] text-[18px] lg:leading-[32px] text-primYellow py-1 sm:py-0">
                    {product.price.toFixed(2)}$
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MenuList;
