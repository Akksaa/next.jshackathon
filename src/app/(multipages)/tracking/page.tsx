// "use client";

// import { useState, useEffect, Suspense } from "react";
// import axios from "axios";
// import { useSearchParams, useRouter } from "next/navigation";
// import { TrackingData } from "@/types/shipmentDetails";

// const TrackingPage = () => {
//   const [labelId, setLabelId] = useState("");
//   const [trackingInfo, setTrackingInfo] = useState<TrackingData | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const queryLabelId = searchParams?.get("labelId") || "";

//   useEffect(() => {
//     if (queryLabelId) {
//       setLabelId(queryLabelId);
//       fetchTrackingData(queryLabelId);
//     }
//   }, [queryLabelId]);

//   const fetchTrackingData = async (id: string) => {
//     if (!id) {
//       setErrorMessage("Label ID is required.");
//       return;
//     }

//     setIsLoading(true);
//     setErrorMessage(null);

//     try {
//       router.replace(`/tracking?labelId=${id}`);

//       const { data } = await axios.get(`/api/shipengine/tracking/${id}`);
//       setTrackingInfo(data);
//     } catch (error) {
//       console.error("Error fetching tracking data:", error);
//       setErrorMessage("Unable to track shipment. Please verify the Label ID.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     fetchTrackingData(labelId);
//   };

//   return (
//     <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
//       <div className="w-full max-w-2xl p-8 bg-gray-800 rounded-xl shadow-lg">
//         <h1 className="text-4xl font-bold text-center text-blue-400 mb-6">
//           Shipment Tracking
//         </h1>

//         <form onSubmit={handleFormSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="labelId" className="block text-lg font-medium text-gray-300">
//               Label ID / Tracking Number
//             </label>
//             <input
//               type="text"
//               id="labelId"
//               value={labelId}
//               onChange={(e) => setLabelId(e.target.value)}
//               placeholder="Enter your Label ID"
//               className="w-full mt-2 p-3 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all ${
//               isLoading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {isLoading ? "Tracking..." : "Track Shipment"}
//           </button>
//         </form>

//         {errorMessage && (
//           <div className="mt-6 p-4 text-red-400 bg-red-900 border border-red-500 rounded-lg">
//             {errorMessage}
//           </div>
//         )}

//         {trackingInfo && (
//           <div className="mt-8 p-6 bg-gray-700 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold text-blue-300 mb-4">Tracking Information</h2>
//             <ul className="space-y-3 text-gray-300">
//               <li className="text-lg">
//                 <strong>Tracking Number:</strong> {trackingInfo.trackingNumber}
//               </li>
//               <li className="text-lg">
//                 <strong>Status:</strong> {trackingInfo.statusDescription}
//               </li>
//               <li className="text-lg">
//                 <strong>Carrier Status:</strong> {trackingInfo.carrierStatusDescription || "N/A"}
//               </li>
//               <li className="text-lg">
//                 <strong>Estimated Delivery:</strong> {trackingInfo.estimatedDeliveryDate || "N/A"}
//               </li>
//               <li className="text-lg">
//                 <strong>Actual Delivery:</strong> {trackingInfo.actualDeliveryDate || "N/A"}
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// const App = () => (
//   <Suspense fallback={<div className="text-center py-10 text-gray-300">Loading...</div>}>
//     <TrackingPage />
//   </Suspense>
// );

// export default App;
'use client'
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Package, Search, Truck, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { TrackingData } from "@/types/shipmentDetails";

const TrackingPage = () => {
  const [labelId, setLabelId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const queryLabelId = searchParams?.get("labelId") || "";

  useEffect(() => {
    if (queryLabelId) {
      setLabelId(queryLabelId);
      fetchTrackingData(queryLabelId);
    }
  }, [queryLabelId]);

  const fetchTrackingData = async (id: string) => {
    if (!id) {
      setErrorMessage("Label ID is required.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      router.replace(`/tracking?labelId=${id}`);
      const { data } = await axios.get(`/api/shipengine/tracking/${id}`);
      setTrackingInfo(data);
    } catch (error) {
      console.error("Error fetching tracking data:", error);
      setErrorMessage("Unable to track shipment. Please verify the Label ID.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchTrackingData(labelId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Package className="h-6 w-6 text-blue-600" />
            Shipment Tracking
          </CardTitle>
          <p className="text-gray-600">
            Enter your Label ID or tracking number to track your shipment
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="labelId" className="text-sm font-medium text-gray-700">
                Label ID / Tracking Number
              </label>
              <div className="relative">
                <Input
                  type="text"
                  id="labelId"
                  value={labelId}
                  onChange={(e) => setLabelId(e.target.value)}
                  placeholder="Enter your Label ID"
                  className="pl-10"
                />
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2"
            >
              <Truck className="h-4 w-4" />
              {isLoading ? "Tracking..." : "Track Shipment"}
            </Button>
          </form>

          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {trackingInfo && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Tracking Information
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Tracking Number</p>
                    <p className="font-medium">{trackingInfo.trackingNumber}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">{trackingInfo.statusDescription}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Carrier Status</p>
                    <p className="font-medium">{trackingInfo.carrierStatusDescription || "N/A"}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Estimated Delivery</p>
                    <p className="font-medium">{trackingInfo.estimatedDeliveryDate || "N/A"}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Actual Delivery</p>
                    <p className="font-medium">{trackingInfo.actualDeliveryDate || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const App = () => (
  <Suspense fallback={
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-center gap-2">
          <Package className="h-6 w-6 text-blue-600 animate-pulse" />
          <p className="text-gray-600">Loading tracking information...</p>
        </div>
      </Card>
    </div>
  }>
    <TrackingPage />
  </Suspense>
);

export default App;