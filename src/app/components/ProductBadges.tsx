import { FoodProduct } from '@/types/FoodProduct';
import React from 'react';

const ProductBadges = ({ product }: { product: FoodProduct}) => {
  const badges = [];
  
  // Add badges based on conditions
  if (product.isDiscounted) {
    badges.push({
      text: "Hot Offer",
      color: "bg-red-500"
    });
  }
  
  if (product.tags?.includes("Popular")) {
    badges.push({
      text: "Popular",
      color: "bg-blue-500"
    });
  }
  
  if (product.tags?.includes("best seller")) {
    badges.push({
      text: "Best Seller",
      color: "bg-green-500"
    });
  }

  return (
    <>
      {badges.map((badge, index) => (
        <div
          key={badge.text}
          className={`absolute text-white text-xs px-2 py-1 openSans ${badge.color}`}
          style={{
            top: '8px',
            left: `${8 + (index * 90)}px`
          }}
        >
          {badge.text}
        </div>
      ))}
    </>
  );
};

export default ProductBadges;