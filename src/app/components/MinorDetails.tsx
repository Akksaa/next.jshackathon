'use client'
import { FoodProduct } from "@/types/FoodProduct";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import icons for filled and unfilled hearts
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";

export default function MinorDetails({product}:{product:FoodProduct}) {
  const [isWishlist, setIsWishlist] = useState(false); // State to track wishlist status

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist); // Toggle the wishlist state
  };

  return (
    <div className="">
      

      <div className="mt-4 space-y-3">
        <div className="flex space-x-2">
           <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleWishlist}>
            {isWishlist ? (
                <FaHeart className="text-red-500 text-xl" />
            ) : (
                <FaRegHeart className="text-gray-500 text-xl" />
            )}
            <span className="text-gray-700 font-medium">
                {isWishlist ? "Added to Wishlist" : "Add to Wishlist"}
            </span>
            </div>

            <div className="text-gray-700 font-medium flex items-center">
            <span>🔗 Compare</span>
            </div> 
        </div>
        

        <div className="text-gray-700">
          <span className="font-medium">Category:</span> {product.category}
        </div>

        <div className="text-gray-700">
          <span className="font-medium">Tag:</span> {product.tags?.join(',')}
        </div>

        <div className="flex items-center space-x-3 mt-4">
          <span className="text-gray-700 font-medium">Share:</span>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <i className=""> <FaYoutube/> </i>
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <i className="fab fa-facebook"><FaFacebook/> </i>
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <i className="fab fa-twitter"> <FaTwitter/> </i>
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <i className="fab fa-instagram"> <FaInstagram/> </i>
          </a>
        </div>
      </div>
    </div>
  );
}
