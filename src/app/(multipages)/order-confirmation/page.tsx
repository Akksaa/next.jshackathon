
"use client"
import React from "react";

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">

        <h2 className="text-2xl font-semibold text-green-600 text-center mb-6">
          Thank you for your order!
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Your order has been successfully placed. Below are the details:
        </p>

        <div className="border-t border-b py-4 mb-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">
            Order Summary
          </h3>
          <ul>
            <li className="flex justify-between items-center mb-2">
              <span>Chicken Tikka Kabab (110g x 3)</span>
              <span className="font-semibold">₨432.655</span>
            </li>

          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">
            Order Details
          </h3>
          <p>
            <span className="font-medium">Order ID:</span> #12345ABC
          </p>
          <p>
            <span className="font-medium">Estimated Delivery:</span> 3-5
            Business Days
          </p>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">
            Shipping Address
          </h3>
          <p>
            John Doe, 123 Street Name, City Name, Country, ZIP Code
          </p>
        </div>

        <div className="flex flex-col items-center">
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 mb-3"
            onClick={() => alert("Tracking is not available yet!")}
          >
            Track Your Order
          </button>
          <button
            className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700"
            onClick={() => alert("Returning to homepage")}
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
