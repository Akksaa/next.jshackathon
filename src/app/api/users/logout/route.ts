import { NextResponse } from "next/server";

export async function GET() {

    try {
        
        const response = NextResponse.json({
            message: "Logged Out successfully!",
            success: true,
        });
        response.cookies.set("token", '', {
            httpOnly: true,
            expires: new Date(0)
        }); 
        return response;

    } catch (error) {
        console.error("Error fetching data from userTable:", error);
    
        return NextResponse.json(
          {
            success: false,
            message: "Failed to fetch user data",
            error: String(error),
          },
          { status: 500 }
        );
    }
}