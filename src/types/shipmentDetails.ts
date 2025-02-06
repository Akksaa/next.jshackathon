// Define types for the API response
export type Address = {
    name: string;
    phone: string;
    addressLine1: string;
    cityLocality: string;
    stateProvince:"DC" | "SD";
    postalCode: string;
    countryCode: string;
    addressResidentialIndicator: "yes" | "no";
  };
  export type unit = "ounce" | "gram" | "kilogram" | "pound";
  export type dimensionUnit = "inch" | "centimeter";
  
  export type ShippingPackage = {
    weight: {
      value: number;
      unit: unit;
    };
    dimensions: {
      height: number;
      width: number;
      length: number;
      unit: dimensionUnit;
    };
    customsInfo?: {  // 👈 New field for customs data
      description: string;
      quantity: number;
      value: number;
      harmonized_tariff_code?: string; // Optional
      country_of_origin: string;
    };
  };
  
  export type Rate = {
    rateId: string;
    rateType: string;
    carrierId: string;
    shippingAmount: {
      currency: string;
      amount: number;
    };
    serviceType: string;
    serviceCode: string;
    trackable: boolean;
    carrierFriendlyName: string;
    validationStatus: string;
    warningMessages?: string[];
  };
  
  
  export interface trackingObjType {
    trackingNumber: string;
    labelId: string;
    carrierCode: string;
  }
  
  export interface TrackingData {
    trackingNumber?: string;
    statusDescription?: string;
    carrierStatusDescription?: string;
    estimatedDeliveryDate?: string;
    actualDeliveryDate?: string;
  }