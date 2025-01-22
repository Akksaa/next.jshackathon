import { db, userTable } from "@/app/lib/drizzle";
import { eq, gte, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { token } = req;
    console.log(token);

    const user = await db
      .select()
      .from(userTable)
      .where(
        and(
          eq(userTable.verifyToken, token),
          gte(userTable.verifyTokenExpiry, new Date(Date.now()))
        )
      );

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid Token!",
        },
        {
          status: 400,
        }
      );
    }

    console.log(user)

    const result = await db
    .update(userTable)
    .set({
        isVerified: true,
        verifyToken: null, // or undefined based on the library/database
        verifyTokenExpiry: null, // or undefined based on the library/database
    })
    .where(eq(userTable.verifyToken, token)); // Match the user using the token

    return new Response(
        JSON.stringify({
          message: "Your email has been successfully verified. You can now access your account.",
          res: result,
        }),
        {
          status: 200,
        }
      );


  } catch (error) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
  }
}
