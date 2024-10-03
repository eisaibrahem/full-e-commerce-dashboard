import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/api/:path*', // للسماح بجميع المسارات
    // استبعاد المسار الذي تريد السماح له بالوصول
    '/api/9986f653-6b60-4fe2-92fe-fe110e4f8441/store', // السماح لهذا المسار
  ],
};
