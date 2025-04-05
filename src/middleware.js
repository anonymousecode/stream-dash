// import { NextResponse } from 'next/server';

// export function middleware(req) {
//     const token = req.cookies.get('auth_token'); // Get authentication token

//     const loginUrl = new URL('/login', req.url);
//     const dashboardUrl = new URL('/dashboard', req.url);

//     // If user is not logged in and trying to access protected routes, redirect to login
//     if (req.nextUrl.pathname.startsWith('/')) {
//         return NextResponse.redirect(loginUrl);
//     }

//     // If user is logged in and trying to access login page, redirect to dashboard
//     if (token && req.nextUrl.pathname === '/login') {
//         return NextResponse.redirect(dashboardUrl);
//     }

//     return NextResponse.next(); // Continue with request
// }

// // Apply middleware to specific routes
// export const config = {
//     matcher: ['/dashboard/:path*', '/login'], // Protect dashboard and login routes
// };
// // The middleware function checks if the user is authenticated by looking for a token in cookies.
// // If the token is not present and the user tries to access the dashboard, they are redirected to the login page.
// // If the token is present and the user tries to access the login page, they are redirected to the dashboard.

// // !token &&


// ####################################################################

// import { NextResponse } from 'next/server';

// export function middleware(req) {
//     console.log(`🔹 Middleware triggered for: ${req.nextUrl.pathname}`); // Log the request
//     const token = req.cookies.get('auth_token'); // Check authentication token

//     // If user is NOT logged in and NOT on /login, redirect them to /login
//     if (!token && req.nextUrl.pathname !== '/login') {
//         console.log(`🔹 Not authenticated. Redirecting to /login`);
//         return NextResponse.redirect(new URL('/authentication/login', req.url));
//     }

//     // If user is logged in and tries to visit /login, redirect them to /dashboard
//     if (token && req.nextUrl.pathname === '/login') {
//         console.log(`🔹 Already authenticated. Redirecting to /dashboard`);
//         return NextResponse.redirect(new URL('/dashboard', req.url));
//     }

//     // Allow the request to continue
//     return NextResponse.next();
// }

// // Apply middleware to relevant routes
// export const config = {
//     matcher: ['/:path*'], // Apply to all routes
// };


////////////////////////////////////////////////////////////////////////////////////////

// import { NextResponse } from 'next/server';

// export function middleware(req) {
//     console.log(`🔹 Middleware triggered for: ${req.nextUrl.pathname}`); // Log request

//     const token = req.cookies.get('auth_token'); // Get authentication token
//     const loginUrl = new URL('/authentication/login', req.url);
//     const dashboardUrl = new URL('/dashboard', req.url);

//     // ✅ Exclude 404 pages and Next.js assets (_next, API routes)
//     if (
//         req.nextUrl.pathname.startsWith('/_next') || // Static files
//         req.nextUrl.pathname.startsWith('/api') || // API routes
//         req.nextUrl.pathname === '/404' // Allow custom 404 page
//     ) {
//         console.log(`🔹 Skipping middleware for: ${req.nextUrl.pathname}`);
//         return NextResponse.next();
//     }

//     // If user is NOT logged in, redirect them to /authentication/login
//     if (!token && req.nextUrl.pathname !== '/authentication/login') {
//         console.log(`🔹 Not authenticated. Redirecting to /authentication/login`);
//         return NextResponse.redirect(loginUrl);
//     }

//     // If user is logged in and tries to visit /authentication/login, redirect them to /dashboard
//     if (token && req.nextUrl.pathname === '/authentication/login') {
//         console.log(`🔹 Already authenticated. Redirecting to /dashboard`);
//         return NextResponse.redirect(dashboardUrl);
//     }

//     // Allow other requests
//     return NextResponse.next();
// }

// // Apply middleware to relevant routes
// export const config = {
//     matcher: ['/:path*'], // Apply middleware to all routes
// };


// ??????????????????????????????????????????????????????????????????????????????????????????????????????//


import { NextResponse } from 'next/server';

export function middleware(req) {
    const { pathname } = req.nextUrl;

    console.log(`🔹 Middleware triggered for: ${pathname}`);

    const loginUrl = new URL('/authentication/login', req.url);
    const dashboardUrl = new URL('/dashboard', req.url);

    // ✅ Skip middleware for static files, API routes, and 404
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname === '/404'
    ) {
        console.log(`🔹 Skipping middleware for: ${pathname}`);
        return NextResponse.next();
    }

    if (pathname == '/') {
        console.log(`🔹 Redirecting to /authentication/login`);
        return NextResponse.redirect(loginUrl);
        // return NextResponse.next();
    }

    // ✅ Always redirect to /authentication/login if not already there or on /dashboard
    // if (pathname == '/authentication/login') {
    //     console.log(`🔹 Redirecting to /authentication/login`);
    //     // return NextResponse.redirect(loginUrl);
    //     return NextResponse.next();
    // }

    // ✅ Let /authentication/login and /dashboard proceed
    return NextResponse.next();
}

export const config = {
    matcher: ['/:path*'],
};

