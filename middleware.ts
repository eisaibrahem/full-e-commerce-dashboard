import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

// إنشاء matcher للمسارات العامة
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api/:path*']);

export default clerkMiddleware((auth, req: NextRequest) => {
  // التحقق مما إذا كان المسار هو مسار عام باستخدام NextRequest
  if (isPublicRoute(req)) {
    return; // لا حاجة لتطبيق حماية المصادقة على المسارات العامة
  }

  // إذا كان المسار غير عام، يتم فرض المصادقة
  auth().protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
