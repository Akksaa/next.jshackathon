interface ShipmentInfo {
    _id: string;
    userName:string;
    userPhone:string;
    userId:string;
    address: string;
    city: string;
    countryCode:string;
    postalCode: string;
  }
  interface Product {
    _id: string;
    _ref: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }
  
  interface OrderItem {
    _key: string;
    quantity: number;
    unitPrice: number;
    product: Product;
  }
  
  interface PaymentDetails {
    totalAmount: number;
    status: string;
  }
  
  interface Order {
    _id: string;
    orderId:string;
    customerId: string;
    customerName: string;
    status: string;
    paymentDetails: PaymentDetails;
    _createdAt: string;
    shippingInfo: ShipmentInfo;
    items: OrderItem[];
  }