import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(request: NextRequest) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Allow access to auth pages when not authenticated
        if (pathname.startsWith('/auth/')) {
          return !token
        }
        
        // Allow access to API auth routes
        if (pathname.startsWith('/api/auth')) {
          return true
        }
        
        // Protect dashboard and profile routes
        if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile')) {
          return !!token
        }
        
        // Allow access to home page
        if (pathname === '/') {
          return true
        }
        
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
