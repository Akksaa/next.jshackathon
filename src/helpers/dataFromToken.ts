import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'


interface DecodedToken {
    id: string;
  }

export const getDataFromToken = (request:NextRequest) => {

    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
        return decodedToken.id;

    } catch (error) {
    console.error("Error fetching data through token:", error);
    
    }
}