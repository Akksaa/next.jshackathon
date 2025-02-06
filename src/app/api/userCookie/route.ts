import { cartTable, db } from '@/app/lib/drizzle';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('user_id')?.value as string;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID not found in cookies' },
        { status: 401 }
      );
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    if (!API_URL) {
      return NextResponse.json(
        { error: 'API URL not configured' },
        { status: 500 }
      );
    }

    const url = await fetch(`${API_URL}/api/cart?user_id=${userId}`);
    
    if (!url.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch cart data' },
        { status: url.status }
      );
    }

    const cartData = await url.json();
    
    const cart = await db
    .select()
    .from(cartTable)
    .where(eq(cartTable.user_id, userId));

    if (!cart.length) {
      console.log('cart is empty')
    }

  // await db.delete(cartTable).where(eq(cartTable.user_id, userId));


    return NextResponse.json({
      orders: cartData.data,
      user_id:userId
    });

  } catch (error) {
    console.error('Cookie API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}