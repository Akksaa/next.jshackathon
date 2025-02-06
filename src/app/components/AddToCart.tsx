'use client'

import { FoodProduct } from '@/types/FoodProduct'
import { RiShoppingBagLine } from 'react-icons/ri'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'


function AddToCart({ product }: { product: FoodProduct }) {


  const [quantity, setQuantity] = useState(1)
  
  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change))
  }

  const addToCart = async () => {

    const res = await fetch('/api/cart', {
      method: 'POST',
      credentials: "include",
      body: JSON.stringify({
        product_id: product._id,
        product_title: product.name,
        product_price: product.discountPrice || product.price,
        product_quantity: quantity,
        image_url: product.images[0],
      })
    });
    if (res .status == 500) {
      toast.error('Please sign up first!')
    } else {
      toast.success('Product Added To Your Bag!')

    }
    const result = await res.json();
    console.log(result)
      
  }

  return (
    <div>
      <Toaster position="top-center"/>
      <div className='flex gap-3'>
      <div>
        <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-500">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="md:px-3 px-2 md:py-3 py-2 border-r border-gray-500 hover:bg-gray-100"
              >
                -
              </button>
              <span className="md:px-4 px-3 md:py-3 py-2">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="md:px-3 px-2 md:py-3 py-2 border-l border-gray-500 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
      </div>
      
        <button 
        onClick={addToCart}
        className="px-4 bg-primYellow inter text-white flex md:gap-3 gap-1 md:text-[20px] text-[17px] items-center hover:bg-amber-400 transition-colors duration-300">
          <span><RiShoppingBagLine/></span> <span>Add to Cart</span>
        </button>
      
        
      </div>
    </div>
  )
}

export default AddToCart
