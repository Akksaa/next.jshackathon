
'use client';
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import { useState } from "react"

type ImageAsset = {
  _id: string;
  url: string;
};

type Image = {
  asset: ImageAsset;
};

export function ProductGallery({
  images,
  productName
}: {
  images: Image[],
  productName: string
}) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="md:flex space-y-2 md:space-y-0 gap-4 lg:gap-2 xl:gap-4">
      {images?.length > 1 && (
        <div className="flex md:flex-col  gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative md:h-[130px] h-[80px] md:w-[130px] w-[80px] overflow-hidden rounded ${
                selectedImage === index
                  ? 'ring-2 ring-primYellow'
                  : 'ring-1 ring-gray-200 hover:ring-gray-300'
              }`}
            >
              <Image
                src={urlFor(image).url() || ''}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      <div className="relative md:h-[596px] h-[300px] lg:h-[400px] xl:h-[596px] flex-1 overflow-hidden rounded bg-gray-100">
        {images?.[selectedImage] && (
          <Image
            src={urlFor(images[selectedImage]).url() || ''}
            alt={`${productName} - Image ${selectedImage + 1}`}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
    </div>
  );
}

export default ProductGallery;