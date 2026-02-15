import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  // Exclude static files, _next internals, and /api/v1/* (proxied to backend)
  matcher: ['/((?!.+\\.[\\w]+$|_next|api/v1).*)', '/'],
}
