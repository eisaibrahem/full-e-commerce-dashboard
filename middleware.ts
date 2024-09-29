import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api/:path*']);

export default clerkMiddleware((auth, req: NextRequest) => {
  console.log("Checking route:", req.nextUrl.pathname);

  if (isPublicRoute(req)) {
    console.log("Public route detected, skipping authentication:", req.nextUrl.pathname);
    return;
  }

  console.log("Protected route, enforcing authentication:", req.nextUrl.pathname);
  auth().protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
