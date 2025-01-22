import { db, userTable } from "@/app/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { email, password } = req;

    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!user) {
      return NextResponse.json(
        { message: "User Doesn't exist!" },
        { status: 404 }
      );
      
    }
    console.log("user exists!");

    const validPassword = await bcryptjs.compare(password, user[0].password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );

    }
    const payload = {
      id: user[0].id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    const response = NextResponse.json({
      message: "Logged In successfully!",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
    
  } catch (error) {
    console.error("Error fetching data from userTable:", error);

    return NextResponse.json(
      {
        success: false,
        message: "User Doesn't exist!",
        error: String(error),
      },
      { status: 404 }
    );
  }
}
