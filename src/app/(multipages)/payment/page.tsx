'use client';

import CheckoutPage from "@/app/components/CheckoutPage";
import Loading from "@/app/components/Loading";
import convertToSubcurrency from "@/app/lib/convertToSubcurrency";
import { totalPrice } from "@/helpers/totalPrice";
import { Cart } from "@/types/Cart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCooldown, setIsCooldown] = useState(false); // Cooldown state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const totalAmount = async () => {
      try {
        setIsLoading(true);
        const url = await fetch(`${API_URL}/api/userCookie`);
        
        if (!url.ok) {
          throw new Error('Failed to fetch cart data');
        }
        
        const response = await url.json();
        
        if (!response.orders || !Array.isArray(response.orders)) {
          console.log('Invalid cart data received');
        }

        const subtotal = response.orders.reduce(
          (total: number, item: Cart) =>
            total + (item.product_price * item.product_quantity),
          0
        );

        const total = totalPrice(subtotal);
        
        
        if (total.total <= 0) {
          throw new Error('Cart total must be greater than 0');
        }

        setAmount(total.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Payment page error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    const addOrder = async () => {
      if (isCooldown) {
        console.log("Cooldown active. Please wait before placing another order.");
        return;
      }
  
      try {
        setLoading(true);
        setIsCooldown(true); // Start cooldown
  
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/addOrder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!res.ok) throw new Error("Failed to place order");
  
        const data = await res.json();
        console.log("Order Placed Successfully:", data);
  
      } catch (error) {
        console.error("Order placement failed:", error);
      } finally {
        setLoading(false);
  
        // Cooldown reset after 5 seconds
        setTimeout( () => {
          setIsCooldown(false);
          console.log("Cooldown over. You can place an order again.");
          
        }, 5000);
      }
    };
    addOrder();
    totalAmount();
  }, []);

  if (isLoading || loading) {
    return <Loading/>
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">
      {error}
    </div>;
  }

  if (amount <= 0) {
    return <div className="text-center p-4 h-screen">
      Your cart is empty. Please add items to proceed with payment.
    </div>;
  }

  return (
    <main className="md:max-w-3xl w-full mx-auto md:my-16 p-2">
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </main>
  );
}