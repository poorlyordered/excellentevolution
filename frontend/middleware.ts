import { clerkMiddleware } from "@clerk/nextjs/server";
 
export default clerkMiddleware();
 
// Stop Middleware running on static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    "/((?!static|.*\\..*|_next|favicon.ico).*)",
    "/",
  ],
};
