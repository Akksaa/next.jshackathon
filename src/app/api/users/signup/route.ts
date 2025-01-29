import { db, userTable } from "@/app/lib/drizzle"; 
import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs";
import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  const { username, email, password } = req;

  
  const uid = uuid();
    cookies().set("user_id", uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: "lax", 
    path: "/", 
    maxAge: 60 * 60 * 24 * 7, 
  });
  
 
 
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  if (user[0]) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

 
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  try {
   
    const res = await db
      .insert(userTable)
      .values({
        id: cookies().get('user_id')?.value as string,
        username: username,
        email: email,
        password: hashedPassword,
      })
      .returning();
    
      console.log('response from api/signup', res)

    return NextResponse.json({
      message: "User Registered Successfully!",
      data: res,
    });
  } catch (error) {
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to register user",
        error: String(error),
      },
      { status: 500 }
    );
  }
};
