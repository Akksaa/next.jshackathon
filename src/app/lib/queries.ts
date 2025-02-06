import { client } from "@/sanity/lib/client";

export const allProductsQuery = `*[ _type == "foodProduct"]{
    _id,
    name,
    slug,
    price,
    tags,
    inventory,
    ingredients[],
    nutritionalInfo,
    discountPrice,
    category,
    isDiscounted,
    images[] { asset-> { _id, url } },
    description,
    
}`;
export const shipmentQuery = `*[ _type == "shipmentInfo"] {
_id,
    userName,
    userId,
    userPhone,
    address,
    city,
    countryCode,
    postalCode
}`;

export const oneProduct = `*[ _type == "foodProduct" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    tags,
    inventory,
    ingredients[],
    nutritionalInfo,
    discountPrice,
    category,
    isDiscounted,
    images[] { asset-> { _id, url } },
    description,
    
}`;

export const menuProducts = async (category: string) => {
  const query = `*[ _type == "foodProduct" && category == "${category}"]{
        _id,
        name,
        slug,
        price,
        tags,
        inventory,
        ingredients[],
        nutritionalInfo,
        discountPrice,
        category,
        isDiscounted,
        images[] { asset-> { _id, url } },
        description,
        
    }`;
  const products = await client.fetch(query);
  return products;
};

export const orderData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userCookie`);
  const { user_id } = await res.json();

  const queryForOrder = `
*[_type == "order" && customerId == "${user_id}"] {
orderId,
  _id,
  customerId,
  customerName,
  status,
  paymentDetails,
  orderDate,
  "shippingInfo": shippingInfo->{_id, userName, userPhone, userId, address, city, countryCode, postalCode},
  "items": items[]{
    _key,
    quantity,
    unitPrice,
    "product": product->{_id, name, category, price}
  }
}`;
  const orders = await client.fetch(queryForOrder);
  return orders;
};
