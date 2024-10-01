import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api/:path*', '/webhook']);

export default clerkMiddleware((auth, req: NextRequest) => {
  console.log("Checking route:", req.nextUrl.pathname);

  if (isPublicRoute(req)) {
    console.log("Public route detected, skipping authentication:", req.nextUrl.pathname);
    return;
  }

  // مؤقتًا قم بإلغاء enforce المصادقة لاختبار الوصول بدون Clerk
   auth().protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
