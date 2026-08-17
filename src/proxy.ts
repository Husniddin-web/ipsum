import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - /api, /_next, /_vercel
  // - /admin (internal admin panel)
  // - static files with extensions (e.g. .ico, .png, .jpg, .svg)
  matcher: [
    '/((?!api|_next|_vercel|admin|.*\\..*).*)',
    '/',
    '/(ru|uz|en)/:path*',
  ],
};
