import { db, userTable } from "@/app/lib/drizzle"; 
import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";

export const GET = async (request: NextRequest) => {

  const req = request.nextUrl;
  const uid = req.searchParams.get('user_id') as string;

    try {

      const res = await db.select().from(userTable).where(eq(userTable.id, uid));
      return NextResponse.json({data : res});
    } catch (error) {
      console.error('Error fetching data from userTable:', error);

      return NextResponse.json(
        { success: false, message: 'Failed to fetch user data', error: String(error) },
        { status: 500 }
      );
    }
};

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  const { username, email, password } = req;

  
  const uid = uuid();
  cookies().set("user_id", uid, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
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

    
    await sendEmail({ email, emailType: "VERIFY", userId: res[0].id });

    return NextResponse.json({
      message: "User Registered Successfully!",
      data: res,
    });
  } catch (error) {
    console.error("Error inserting data into userTable:", error);

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
