'use client'
import { urlFor } from '@/sanity/lib/image';
import { FoodProduct } from '@/types/FoodProduct';
import { PortableText, PortableTextComponents } from 'next-sanity';
import Image from 'next/image';
import { useState } from 'react';

export default function Details({ product }: { product: FoodProduct }) {
  
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  const [reviews, setReviews] = useState<
  { username: string; comment: string; rating: number }[]
  >([]);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && comment && rating > 0) {
      setReviews([...reviews, { username, comment, rating }]);
      setUsername("");
      setComment("");
      setRating(0);
    }
  };

const handleStarClick = (index: number) => {
  setRating(index + 1);
};

  const ptComponents: PortableTextComponents = {
      types: {
        image: ({ value }) => {
          if (!value?.asset?._ref) {
            return null
          }
          return (
            <div className="relative w-full h-48 my-4">
              <Image
                src={urlFor(value).url()}
                alt=''
                fill
                className="object-cover rounded"
              />
            </div>
          )
        }
      },
      block: {
        normal: ({ children }) => (
          <p className="mb-4">{children}</p>
        ),
      }
    }
  return (
    <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-8">
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('description')}
          className={`md:px-4 px-2 md:py-2 py-1 md:text-[20px] text-[18px] text-white ${
            activeTab === 'description' ? 'bg-primYellow' : 'bg-gray-400'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`md:px-4 px-2 md:py-2 py-1 md:text-[20px] text-[18px] text-white ${
            activeTab === 'reviews' ? 'bg-primYellow' : 'bg-gray-400'
          }`}
        >
          Reviews
        </button>
      </div>

      {activeTab === 'description' && product.ingredients && (
        <div className="mt-6">
          <div className="border-b-[1px]">
            <div className=" max-w-none">
              <div className=" text-gray-600 prose inter md:text-[18px] text-[16px]">
                {product.description && (
                  <PortableText
                    value={product.description}
                    components={ptComponents}
                  />
                )}
              </div>
            </div>
          </div>
          <h2 className=" mt-6 openSans">Ingredients:</h2>
          <ul className="bg-white rounded-lg p-4 shadow-sm">
            {product.ingredients.map((ingredient: string, index: number) => (
              <li key={index} className="mb-1 text-gray-700 inter md:text-[18px] text-[16px]">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      )}

    <div>
      {activeTab === "reviews" && (
        <div className="mt-6">
          <h2 className="md:text-2xl text-lg font-bold mb-6 openSans">Write a Review</h2>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg md:p-6 shadow-sm">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full p-2 border outline-none border-gray-300 shadow-sm focus:ring-primYellow md:text-[20px] text-[18px] focus:border-primYellow"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                Your Review
              </label>
              <textarea
                id="review"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 block w-full p-2 border outline-none border-gray-300 shadow-sm md:text-[20px] text-[18px] focus:ring-primYellow focus:border-primYellow"
                placeholder="Write your review here..."
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleStarClick(index)}
                    className={`text-2xl ${
                      index < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="bg-primYellow md:text-[20px] text-[18px] text-white md:px-4 px-2 md:py-2 py-1  hover:bg-amber-400 transition-colors duration-300"
            >
              Submit Review
            </button>
          </form>

          
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4 openSans">Reviews</h3>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4 inter md:text-[20px] text-[18px]">
                  <p className="text-sm font-semibold">{review.username}</p>
                  <p className="text-gray-700">{review.comment}</p>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, starIndex) => (
                      <span
                        key={starIndex}
                        className={`text-xl ${
                          starIndex < review.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 inter md:text-[20px] text-[18px]">No reviews yet. Be the first to write one!</p>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
