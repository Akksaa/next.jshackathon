// import { client } from '@/sanity/lib/client'
// import { urlFor } from '@/sanity/lib/image';
// import { FoodProduct } from '@/types/FoodProduct';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react'

// async function MoreProducts() {
//     const query = `*[ _type == "foodProduct" && "latest" in tags]{
//         _id,
//         name,
//         slug,
//         price,
//         ingredients[],
//         nutritionalInfo,
//         discountPrice,
//         category,
//         isDiscounted,
//         images[] { asset-> { _id, url } },
//         description,
        
//     }`

//     const products = await client.fetch(query);
//   return (
//     <div>
//       <div className='mt-6 mb-16'>
//         <div className="flex items-center justify-center mt-5 w-full">
//             <div className="w-[1440px] flex justify-start text-gunmetal p-3 lg:p-0">
//             <p className='openSans text-[32px]'> Similar Products</p>
//             </div>
//         </div>
//       <div className='w-full flex justify-center'>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 2xl:w-[1440px] w-full">
//       {
//         products.map((product:FoodProduct) => (
//           <Link 
              
//           href={`/products/${product.slug.current}`} 
//           key={product._id}
//           className=""
//           >
//           <div className=''>
//             <div className='mt-3 lg:mt-10 flex justify-center'>
//               <div  className=' tracking-wide group'>
//                 <div className="flex gap-4 w-[290px] md:w-[320px] lg:w-[240px] xl:w-[320px] overflow-hidden container h-[320px] lg:h-[250px] xl:h-[320px] relative">
//                   <Image 
//                     src={urlFor(product.images[0]).url() || ''}
//                     alt= {product.name}
//                     fill 
//                     className={product.images[1] ? 'img1' : 'h-[100%] w-[100%] object-cover'}/>
//                   {product.images[1] && (
//                     <Image 
//                       src={urlFor(product.images[1]).url() || ''}
//                       alt={product.name}
//                       fill  
//                       className='img2'
//                     />
//                   )}
//                 </div>
//                 <h1 className='mt-2 group-hover:text-primYellow transition-colors duration-200 font-bold inter text-[18px] text-zinc-800'>{product.name}</h1>
//                 <div className="mt-4">
//                     {product.isDiscounted && product.discountPrice ? (
//                     <div className="flex items-center inter gap-2">
//                         <p className="text-[16px] font-normal text-primYellow">{product.discountPrice.toFixed(2)}$</p>
//                         <p className="text-[16px] font-normal text-gray-700 line-through">{product.price.toFixed(2)}$</p>
//                     </div>
//                     ) : (
//                     <p className="text-[16px] font-normal text-primYellow inter">{product.price.toFixed(2)}$</p>
//                     )}
//                 </div>              
//                 </div>
//             </div>
//           </div>
//         </Link>
//         ))}
//       </div>
//     </div>
//     </div>
//     </div>
//   )
// }

// export default MoreProducts
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { FoodProduct } from '@/types/FoodProduct';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

async function MoreProducts() {
  const query = `*[ _type == "foodProduct" && "latest" in tags]{
    _id,
    name,
    slug,
    price,
    ingredients[],
    nutritionalInfo,
    discountPrice,
    category,
    isDiscounted,
    images[] { asset-> { _id, url } },
    description,
  }`;

  const products = await client.fetch(query);
  
  return (
    <div className="w-full px-4 lg:px-0">
      <div className="mt-6 mb-16">
        <div className="flex items-center justify-center mt-5 w-full">
          <div className="w-full max-w-[1440px] flex justify-start text-gunmetal">
            <p className="openSans text-[32px]">Similar Products</p>
          </div>
        </div>
        <div className="w-full flex justify-center mt-6">
          <div className="w-full max-w-[1440px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product: FoodProduct) => (
              <Link
                href={`/products/${product.slug.current}`}
                key={product._id}
                className="w-full flex justify-center"
              >
                <div className="w-full max-w-[320px]">
                  <div className="tracking-wide group">
                    <div className="relative w-full aspect-square overflow-hidden">
                      {/* First image */}
                      <div className="absolute inset-0 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
                        <Image
                          src={urlFor(product.images[0]).url() || ''}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      {/* Second image (if exists) */}
                      {product.images[1] && (
                        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                          <Image
                            src={urlFor(product.images[1]).url() || ''}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                    
                    <h1 className="mt-2 group-hover:text-primYellow transition-colors duration-200 font-bold inter text-[18px] text-zinc-800">
                      {product.name}
                    </h1>
                    
                    <div className="mt-4">
                      {product.isDiscounted && product.discountPrice ? (
                        <div className="flex items-center inter gap-2">
                          <p className="text-[16px] font-normal text-primYellow">
                            {product.discountPrice.toFixed(2)}$
                          </p>
                          <p className="text-[16px] font-normal text-gray-700 line-through">
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
    </div>
  );
}

export default MoreProducts;