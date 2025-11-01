// proxy.js - Corrected for Next.js 16
import { NextResponse } from 'next/server';

const locales = ['en', 'ur', 'es', 'fr', 'ar', 'hi'];
const defaultLocale = 'en';

// Option 1: Named export (use this one)
export function proxy(request) {
  const { pathname } = request.nextUrl;
  
  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect to default locale (English)
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

// Option 2: Or you can use default export instead
// export default function proxy(request) {
//   // ... same function body as above
// }

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};