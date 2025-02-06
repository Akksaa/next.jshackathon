"use client";

import { useState } from "react";
import { Address, ShippingPackage } from "@/types/shipmentDetails";
import React from "react";
import { orderData } from "../lib/queries";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Clock, Scale, Box } from "lucide-react";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FileDown,
  Package,
  Globe,
  CalendarClock,
  DollarSign,
} from "lucide-react";
import { Order } from "@/types/Orders";

interface ShipmentRate {
  shipFrom: Address;
  shipmentId: string;
  shipTo: {
    name: string;
    phone: string;
    addressLine1: string;
    cityLocality: string;
    stateProvince: "SD";
    postalCode: string;
    countryCode: string;
    addressResidentialIndicator: "yes";
  };
  rateResponse: {
    rates: Rate[];
    invalidRates: Rate[];
    rateRequestId: string;
    shipmentId: string;
    createdAt: string;
    status: string;
  };
  shipmentStatus: string;
  shipDate: string;
  totalWeight: {
    value: number;
    unit: string;
  };
  packages: [
    {
      packageCode: "package";
    },
  ];
  customs: {
    contents: string;
    nonDelivery: string;
  };
}
interface Rate {
  rateId?: string;
  carrierId: string;
  serviceCode: string;
  totalAmount: {
    amount: number;
    currency: string;
  };
}
interface Label {
  labelId: string;
  status: string;
  shipmentId: string;
  shipDate: string;
  createdAt: string;
  isInternational: boolean;
  shipmentCost: { currency: "usd"; amount: number };
  trackingNumber: string;
}

export const getShippingRates = async (
  shipToAddress: Address,
  packages: ShippingPackage[]
) => {
  try {
    const response = await fetch("/api/shipengine/get-rates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shipToAddress, packages }),
      cache: "no-store", // Ensures fresh data in Next.js 14+
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.shipmentDetails;
  } catch (error) {
    console.error("Failed to fetch shipping rates:", error);
    return { error: error };
  }
};

export const createShippingLabel = async (rateId: string) => {
  try {
    const response = await fetch("/api/shipengine/create-label", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rateId }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create shipping label:", error);
    return { error: error };
  }
};

export default function ShippingRatesComponent() {
  const [shippingRates, setShippingRates] = useState<ShipmentRate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [label, setLabel] = useState<Label>();

  let rateId: string;
  shippingRates?.rateResponse.rates.forEach(
    (rate: Rate) => (rateId = rate.rateId!)
  );

  const handleGetRates = async () => {
    setLoading(true);
    setError("");
    const orders = await orderData();
    const order: Order = orders[0];
    console.log("logging order", order);

    const shipToAddress: Address = {
      name: order.customerName,
      phone: order.shippingInfo.userPhone,
      addressLine1: order.shippingInfo.address,
      cityLocality: order.shippingInfo.city,
      postalCode: order.shippingInfo.postalCode,
      addressResidentialIndicator: "yes",
      stateProvince: "SD",
      countryCode: order.shippingInfo.countryCode,
    };

    const packages: ShippingPackage[] = order.items.map((item) => {
      const pkg: ShippingPackage = {
        weight: {
          value: order.paymentDetails.totalAmount,
          unit: "gram",
        },
        dimensions: {
          height: 10,
          width: 15,
          length: 20,
          unit: "centimeter", // Example unit (adjust based on your dimensionUnit type)
        },
        customsInfo: {
          description: item.product.name,
          quantity: item.quantity,
          value: item.unitPrice || 9, // USD price
          harmonized_tariff_code: "0902.10.10",
          country_of_origin: "PK",
        },
      };

      return pkg;
    });

    try {
      const data = await getShippingRates(shipToAddress, packages);
      setShippingRates(data);
      console.log("shipping data", data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLabel = async (rateId: string) => {
    if (!rateId) {
      setError("No rate request ID available");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await createShippingLabel(rateId);
      setLabel(data);
      console.log("label:", data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handleDownloadPDF = () => {
    window.open(
      "https://api.shipengine.com/v1/downloads/14/T45qkRSIT0KwpRBkBwQa9w/label-20612855.pdf",
      "_blank"
    );
  };

  const formatAddress = (address: Address) => {
    const parts = [
      address.name,
      address.addressLine1,
      `${address.cityLocality}, ${address.stateProvince} ${address.postalCode}`,
      address.countryCode,
    ].filter(Boolean);
    return parts;
  };

  return (
    <div className="p-4 w-full mx-auto mt-10 openSans h-full ">
      <h2 className="text-lg font-semibold mb-4 ">
        Shipping Details & Labels
      </h2>
      <div className="space-y-4">
        <div className="flex w-full">
          <button 
          onClick={handleGetRates}
          className="bg-blue-500 text-white px-4 py-2 text-sm rounded hover:bg-blue-600 flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Get Shipping Details
          </button>
        </div>

        {loading && (
          <p className="text-gray-500 mt-2 text-center">Loading...</p>
        )}
        {error && (
          <p className="text-red-500 mt-2 text-center">Error: {error}</p>
        )}

        {shippingRates && (
          <div>
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Box className="h-6 w-6" />
                  Shipment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status and Dates */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-500">Status</p>
                    </div>
                    <p className="font-medium capitalize">
                      {shippingRates.shipmentStatus}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-500">Ship Date</p>
                    </div>
                    <p className="font-medium">
                      {formatDate(shippingRates.shipDate)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-500">Total Weight</p>
                    </div>
                    <p className="font-medium">
                      {shippingRates.totalWeight.value}{" "}
                      {shippingRates.totalWeight.unit}
                    </p>
                  </div>
                </div>

                {/* Addresses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ship From */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold">Ship From</h3>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                      {formatAddress(shippingRates.shipFrom).map(
                        (line, index) => (
                          <p key={index} className="text-sm">
                            {line}
                          </p>
                        )
                      )}
                      <p className="text-sm text-gray-600">
                        Phone: {shippingRates.shipFrom.phone}
                      </p>
                    </div>
                  </div>

                  {/* Ship To */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-green-500" />
                      <h3 className="font-semibold">Ship To</h3>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                      {formatAddress(shippingRates.shipTo).map(
                        (line, index) => (
                          <p key={index} className="text-sm">
                            {line}
                          </p>
                        )
                      )}
                      <p className="text-sm text-gray-600">
                        Phone: {shippingRates.shipTo.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Package Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-gray-500" />
                    <h3 className="font-semibold">Package Information</h3>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Package Type</p>
                        <p className="text-sm font-medium capitalize">
                          {shippingRates.packages[0].packageCode}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Shipment ID</p>
                        <p className="text-sm font-medium">
                          {shippingRates.shipmentId}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Contents</p>
                        <p className="text-sm font-medium capitalize">
                          {shippingRates.customs.contents}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Non-Delivery</p>
                        <p className="text-sm font-medium capitalize">
                          {shippingRates.customs.nonDelivery.replace(/_/g, " ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex w-full">
              <button
                onClick={() => handleCreateLabel(rateId)}
                className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600"
              >
                Create Shipping Label
              </button>
            </div>
          </div>
        )}

        {label && (
          <Card className="max-w-2xl mx-auto openSans">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-6 w-6" />
                Shipping Label Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status and Tracking */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium capitalize">Completed</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Label ID / Trcaking Number</p>
                  <p className="font-medium">{label.labelId}</p>
                </div>
              </div>

              {/* Shipping Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Ship Date</p>
                    <p className="font-medium">{formatDate(label.shipDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Shipping Type</p>
                    <p className="font-medium">
                      {label.isInternational ? "International" : "Domestic"} -
                      Global Post Priority
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Shipping Cost</p>
                    <p className="font-medium">
                      ${label.shipmentCost.amount.toFixed(2)}{" "}
                      {label.shipmentCost.currency.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div className="space-y-2">
                <h3 className="font-semibold">Package Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm">Type: Flat Rate Legal Envelope</p>
                  <p className="text-sm">Label Format: PDF (4x6)</p>
                  <p className="text-sm">Carrier: Stamps.com</p>
                </div>
              </div>

              {/* Download Button */}
              <Button
                onClick={handleDownloadPDF}
                className="w-full flex items-center justify-center gap-2"
              >
                <FileDown className="h-4 w-4" />
                Download Shipping Label PDF
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
