import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/recipes", "/recipe/(.*)", "/api(.*)","/userrecipes", "/greenDotPng.png", "/redDot.png"],
  ignoredRoutes: ["/favicon.ico", "/assets/(.*)"]
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/(api|trpc)(.*)"],
};
