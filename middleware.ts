export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/((?!api|sign-in|sign-up|verification|reset-password).*)"],
};
