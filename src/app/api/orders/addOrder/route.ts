import { cartTable, db, userTable } from "@/app/lib/drizzle";
import { shipmentQuery } from "@/app/lib/queries";
import { totalPrice } from "@/helpers/totalPrice";
import { client } from "@/sanity/lib/client";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const user_id = cookies().get("user_id")?.value as string;

    if (!user_id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }
    const cartItems = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.user_id, user_id));

    const userRes = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, user_id));

    const {username , id} = userRes[0];
    const orderId = `ORD-${Date.now()}`;

    const shipmentInfo = await client.fetch(shipmentQuery);
    const total = totalPrice(
      cartItems.reduce(
        (total, cart) => total + cart.product_price! * cart.product_quantity!,
        0
      )
    );
    console.log("shipment info",shipmentInfo)

    const matchedShipment = shipmentInfo.find(
      (shipment: { userId: string; userName: string; }) => 
        shipment.userId === id 
    );
    
    // Get the shipmentId (or _id in Sanity)
    const shipmentId = matchedShipment?._id;
    
    if (!shipmentId) {
      console.error('No matching shipment found for the user');
      // Handle the error appropriately - maybe create a new shipment or throw an error
      throw new Error(`No shipment found for user: ${username}`);
    }
    
    
    

    const order = {
        _type: 'order',
        orderId,
        customerId:id,
        customerName: username,
        orderDate: new Date().toISOString(),
        status: 'pending',
        items: cartItems.map(item => ({
        _key: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          _type: 'object',
          product: {
            _type: 'reference',
            _ref: item.product_id // Assuming productId is the Sanity document ID
          },
          quantity: item.product_quantity,
          unitPrice: item.product_price
        })),
        shippingInfo: {
          _type: 'reference',
          _ref: shipmentId,
        },
        paymentDetails: {
          status: 'pending',
          totalAmount:total.total,
        }
      }
  
      const response = await client.create(order)
    console.log("order placed successfully", response);
    await db.delete(cartTable).where(eq(cartTable.user_id, user_id));
   return  NextResponse.json({message:'Order Placed Successfully'}, { status:200 })
  } catch (error) {
    console.log("error placing order", error);
    return NextResponse.json({message:'Order Placed cancelled'}, { status:500 })

  }
}
