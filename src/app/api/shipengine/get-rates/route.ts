import { shipEngine } from "@/helpers/shipEngine"; // Import ShipEngine client
import { Address, ShippingPackage } from "@/types/shipmentDetails"
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      shipToAddress,
      packages,
    }: { shipToAddress: Address; packages: ShippingPackage[] } = await req.json();

    // Validate required fields
    if (!shipToAddress || !packages) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: shipeToAddress and packages",
        }),
        { status: 400 }
      );
    }

    const shipFromAddress: Address = {
      name: "John Doe",
      phone: "+1 555-678-1234",
      addressLine1: "1600 Pennsylvania Avenue NW",
      cityLocality: "Washington",
      stateProvince:'DC',
      postalCode: "20500",
      countryCode: "US",
      addressResidentialIndicator: "no",
    };

    // Fetch shipping rates from ShipEngine
    const shipmentDetails = await shipEngine.getRatesWithShipmentDetails({
      shipment: {
        shipTo: shipToAddress,
        shipFrom: shipFromAddress,
        packages: packages,
        customs: {
          contents: "merchandise",
          nonDelivery: "return_to_sender",
          customsItems: packages.map((pkg) => ({
            description: pkg.customsInfo?.description || "Unknown Item",
            quantity: pkg.customsInfo?.quantity || 1,
            value: { amount: pkg.customsInfo?.value || 0, currency: "usd" },
            harmonized_tariff_code: pkg.customsInfo?.harmonized_tariff_code,
            country_of_origin: pkg.customsInfo?.country_of_origin || "PK",
          })),
        },
      },
      rateOptions: {
        carrierIds: [
            process.env.SHIPENGINE_FIRST_COURIER || "",
            process.env.SHIPENGINE_SECOND_COURIER || "",
            process.env.SHIPENGINE_THIRD_COURIER || "",
        ].filter(Boolean), // Remove empty strings
      },
      
    });

    // Log details for debugging
    console.log("Ship To Address:", shipToAddress);
    console.log("Packages:", packages);
    console.log("Shipment Details:", shipmentDetails);

    // Return the response with shipment details
    return new Response(
      JSON.stringify({ shipToAddress, packages, shipmentDetails }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching shipping rates:", error)
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}

