import { NextResponse, NextRequest } from "next/server";
import { cartTable, db } from "@/app/lib/drizzle";
import { cookies } from "next/headers";
import { and, eq } from "drizzle-orm";

export const GET = async (request: NextRequest) => {
  const req = request.nextUrl;
  const uid = req.searchParams.get("user_id") as string;

  try {
    const res = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.user_id, uid));
    return NextResponse.json({ data: res });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
};

export const POST = async (request: NextRequest) => {
  const req = await request.json();

  try {
    const res = await db
      .insert(cartTable)
      .values({
        user_id: cookies().get("user_id")?.value as string,
        product_id: req.product_id,
        product_quantity: req.product_quantity,
        product_price: req.product_price,
        product_title: req.product_title,
        image_url: req.image_url,
      })
      .returning();

    return NextResponse.json({ success: true, data: res });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }

    return NextResponse.json({ success: false }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  const req = request.nextUrl;
  const uid = req.searchParams.get("user_id") as string;
  const product_id = req.searchParams.get("product_id") as string;
  console.log("product id", product_id);

  try {
    const deleteCondition = product_id
      ? and(eq(cartTable.user_id, uid), eq(cartTable.product_id, product_id))
      : eq(cartTable.user_id, uid);

    const res = await db.delete(cartTable).where(deleteCondition).returning();
    return NextResponse.json({ data: res });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
