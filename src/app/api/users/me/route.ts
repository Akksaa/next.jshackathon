import { db, userTable } from "@/app/lib/drizzle";
import { getDataFromToken } from "@/helpers/dataFromToken";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {

    const userId =  getDataFromToken(request);

    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId!));

    if (!user) {
      return NextResponse.json(
        { message: "User Doesn't exist!" },
        { status: 400 }
      );
    }

    return NextResponse.json({
        data: user,
        success: true
    })
}