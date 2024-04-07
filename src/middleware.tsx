import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/recipes", "/recipe/(.*)", "/api(.*)","/userrecipes"],
  ignoredRoutes: ["/favicon.ico", "/assets/(.*)"]
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/(api|trpc)(.*)"],
};
