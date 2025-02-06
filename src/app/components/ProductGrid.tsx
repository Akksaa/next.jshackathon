import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FoodProduct } from '@/types/FoodProduct';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import ProductBadges from './ProductBadges';

const ProductGrid = ({ 
  currentProducts = [], 
  currentPage = 1, 
  totalPages = 1, 
  handlePageChange,
  urlFor
}: {
    currentProducts: FoodProduct[],
    currentPage:number,
    totalPages:number,
    handlePageChange:(pageNumber: number) => void,
    urlFor:(source: SanityImageSource) => ImageUrlBuilder

}) => {
  if (!currentProducts || currentProducts.length === 0) {
    return (
      <div className="flex flex-col items-center w-full justify-center min-h-[400px] bg-gray-50 rounded-lg">
        <div className="animate-pulse space-y-4 w-full max-w-2xl px-4">
          <div className="text-center space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 items-end">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {currentProducts.map((product) => (
        
          <Link
            href={`/products/${product.slug.current}`}
            key={product._id}
          >
            <div className="group relative bg-white overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-full aspect-square overflow-hidden">
                {product.images && product.images[0] && (
                  <Image
                    src={urlFor(product.images[0]).url() || ""}
                    alt={product.name}
                    height={400}
                    width={400}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <div className="p-4">
                <ProductBadges product={product}/>
                <h3 className="text-lg lg:text-sm xl:text-lg font-semibold text-gray-900 openSans">
                  {product.name}
                </h3>
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-between items-start sm:items-center gap-2 mt-2">
                  <div>
                    {product.isDiscounted && product.discountPrice ? (
                      <div className="flex gap-1">
                        <p className="text-green-600 font-bold inter">
                          ${product.discountPrice.toFixed(2)}
                        </p>
                        <p className="text-gray-400 line-through">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-primYellow font-bold inter">
                        ${product.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="disabled:opacity-50"
        >
          <FaArrowLeft className="text-zinc-700" />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === index + 1
                ? "bg-primYellow text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="disabled:opacity-50"
        >
          <FaArrowRight className="text-zinc-700" />
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;