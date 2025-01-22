"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Images } from "@/types/FoodProduct";
import { urlFor } from "@/sanity/lib/image";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";

interface FoodProduct {
  slug: { current: string };
  _id: string;
  name: string;
  category: string;
  tags: string[];
  images: Images[];
}

interface ProductSearchProps {
  products: FoodProduct[];
}

const ProductSearch = ({ products }: ProductSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<FoodProduct[]>([]);

  const searchProducts = useCallback(
    (term: string) => {
      if (!term.trim()) {
        setSearchResults([]);
        return;
      }

      const searchTermLower = term.toLowerCase();
      const filtered = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchTermLower) ||
          product.category.toLowerCase().includes(searchTermLower) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(searchTermLower)
          )
        );
      });
      setSearchResults(filtered.slice(0,3));
    },
    [products]
  );

  useEffect(() => {
    searchProducts(searchTerm);
  }, [searchTerm, searchProducts]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="relative bg-transparent rounded-full sm:px-3 px-2 sm:py-[12px] py-[7px] border-[1px] border-primYellow inter sm:text-[16px] text-[12px] sm:leading-[24px] flex items-center">
        <input
          type="text"
          placeholder="Search for food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-white placeholder-white bg-transparent outline-none"
        />
        <CiSearch size={24} className="text-white" />
      </div>

      {searchResults.length > 0 && (
        <div className="mt-4 md:space-y-4 space-y-2 absolute md:right-6 right-2 md:w-[130%] w-[100%] p-1 md:p-3 bg-white">
          {searchResults.map((product) => (
            <Link
            key={product._id}
            href={`/products/${product.slug.current}`}>
            <div
              
              className=" rounded-sm border border-gray-200  bg-white"
            >
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={urlFor(product.images[0]).url()}
                    alt={product.name}
                    height={80}
                    width={80}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-lg openSans text-black">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm openSans">
                      {product.category}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-amber-100 text-primYellow inter rounded-full text-[12px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      )}

      {searchTerm && searchResults.length === 0 && (
        <p className="text-center mt-4 text-white absolute">
          No products found matching &quot;{searchTerm}&quot;
        </p>
      )}
    </div>
  );
};

export default ProductSearch;
