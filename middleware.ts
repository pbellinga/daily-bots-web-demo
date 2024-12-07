import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Detailed request logging
  const url = request.nextUrl
  console.log('--------------------------------')
  console.log('Middleware Debug Info:')
  console.log('Full URL:', url.toString())
  console.log('Pathname:', url.pathname)
  console.log('Search Params:', url.search)
  console.log('Method:', request.method)
  console.log('Headers:', Object.fromEntries(request.headers))

  // Specific handling for semantic_search endpoint
  if (url.pathname === '/semantic_search') {
    console.log('Handling semantic_search request')
    const response = NextResponse.next()
    setCorsHeaders(response)
    console.log('Added CORS headers for semantic_search')
    return response
  }

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request')
    const response = new NextResponse(null, { status: 204 })
    setCorsHeaders(response)
    return response
  }

  // Default response for other routes
  const response = NextResponse.next()
  setCorsHeaders(response)
  return response
}

function setCorsHeaders(response: NextResponse) {
  const headers = {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    'Access-Control-Allow-Headers': '*',
  }

  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value)
    console.log(`Set header ${key}: ${value}`)
  })
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    '/semantic_search',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 