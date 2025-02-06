import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup';

  const user_id = request.cookies.get('user_id')?.value || ''

  if(isPublicPath && user_id) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  }

  if (!isPublicPath && !user_id) {
    return NextResponse.redirect(new URL('/signup', request.nextUrl))
  }
    
}

 
export const config = {
  matcher: [
    '/profile',
    '/login',
    '/signup',
    '/cart',
    '/checkout',    
  ]
}