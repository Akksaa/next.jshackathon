// "use client"
// import Loading from "@/app/components/Loading";
// import ShippingRatesComponent from "@/app/components/ShippingDetails";
// import { orderData } from "@/app/lib/queries";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";



// const OrderConfirmation = () => {

//   const [isLoading, setIsLoading] = useState(true)
//   const [order, setOrder] = useState<Order>()


//   useEffect(() => {
//     const getOrder = async () => {
      
//     const orders = await orderData();
//     const order: Order = orders[0];
//     setOrder(order)
//     }
//     getOrder()
//     setIsLoading(false)
//   })

//   if (isLoading) {
//     <Loading/>
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
//       <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">

//         <h2 className="text-2xl font-semibold text-green-600 text-center mb-6">
//           Thank you for your order!
//         </h2>
//         <p className="text-center text-gray-700 mb-6">
//           Your order has been successfully placed. Below are the details:
//         </p>

//         <div className="border-t border-b py-4 mb-6">
//           <h3 className="font-semibold text-lg text-gray-800 mb-3">
//             Order Summary
//           </h3>
//           <ul>
//             {order?.items.map((item) => 
//             <li
//             key={item._key} 
//             className="flex justify-between items-center mb-2">
//               <span>{item.product.title} (110g x {item.quantity})</span>
//               <span className="font-semibold">{order.paymentDetails.totalAmount}</span>
//             </li>
//             )}
            

//           </ul>
//         </div>
//         <div className="mb-6">
//           <h3 className="font-semibold text-lg text-gray-800 mb-3">
//             Order Details
//           </h3>
//           <p>
//             <span className="font-medium">Order ID:</span> {order?.orderId}
//           </p>
//           <p>
//             <span className="font-medium">Estimated Delivery:</span> 30-50
//             Minutes
//           </p>
//         </div>
//         <div className="mb-6">
//           <h3 className="font-semibold text-lg text-gray-800 mb-3">
//             Shipping Address
//           </h3>
//           <p>
//             {order?.shippingInfo.address}, {order?.shippingInfo.city}, {order?.shippingInfo.countryCode}-{order?.shippingInfo.postalCode}
//           </p>
//         </div>

//         <ShippingRatesComponent/>

//         <div className="flex flex-col items-center">
//           <Link href={`./tracking`}>
//           </Link>
//           <button
//             className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 mb-3"
           
//           >
//             Track Your Order
//           </button>
//           <button
//             className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700"
//             onClick={() => alert("Returning to homepage")}
//           >
//             Back to Homepage
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmation;

'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loading from "@/app/components/Loading";
import ShippingRatesComponent from "@/app/components/ShippingDetails";
import { orderData } from "@/app/lib/queries";
import { Package, Truck, MapPin, Home, Clock } from "lucide-react";

const OrderConfirmation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    const getOrder = async () => {
      const orders = await orderData();
      const order: Order = orders[0];
      setOrder(order);
      setIsLoading(false);
    };
    getOrder();
  }, []); // Added dependency array to prevent infinite loop

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Card className="max-w-3xl mx-auto openSans">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl text-green-600 flex items-center justify-center gap-2">
            <Package className="h-6 w-6" />
            Order Confirmed!
          </CardTitle>
          <p className="text-gray-600">
            Your order has been successfully placed. Below are the details:
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Order Summary */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-500" />
              Order Summary
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {order?.items.map((item) => (
                <div
                  key={item._key}
                  className="flex justify-between items-center py-2 border-b last:border-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">{item.product.price} x {item.quantity}</p>
                  </div>
                  <span className="font-semibold">
                    ${item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              Order Details
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">{order?.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimated Delivery</p>
                <p className="font-medium">30-50 Minutes</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              Shipping Address
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                {order?.shippingInfo.address}, {order?.shippingInfo.city},{" "}
                {order?.shippingInfo.countryCode}-{order?.shippingInfo.postalCode}
              </p>
            </div>
          </div>

          {/* Shipping Rates Component */}
          <ShippingRatesComponent />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link href="./tracking" className="w-full sm:w-auto">
              <Button className="w-full bg-primYellow hover:bg-yellow-500 flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Track Your Order
              </Button>
            </Link>
            <Link href={'./'}>
              <Button
                variant="secondary"
                className="w-full sm:w-auto flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Back to Homepage
              </Button>
            </Link>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmation;
