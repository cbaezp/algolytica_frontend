import { useSelector } from "react-redux";
import Cookie from "js-cookie";

const isBrowser = () => typeof window !== "undefined";

const ProtectedRoutes = ({ router, children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const isAuthenticatedCookie = Cookie.get("isAuthenticated");

  // Check for maintenance mode
  const isInMaintenanceMode =
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  // Skip all ProtectedRoutes logic if maintenance mode is active
  if (isInMaintenanceMode) {
    return children; // Allow the maintenance page or middleware to handle this
  }

  let unprotectedRoutes = [
    "/login",
    "/register",
    "/404",
    "/blog",
    "/posts/[slug]",
    "/posts/en/[slug]",
    "/posts/es/[slug]",
    "/posts/[locale]/[slug]",
    "/forgot-password",
    "/verify-registration",
    "/reset-password",
    "/register_pending",
    "/terms",
    "/privacy",
    "/",
    "/maintenance", // Ensure this is included
  ];

  const excludedPathsSubs = [
    "/subscribe",
    "/settings",
    "/myaccount",
    "/password",
  ]; // Add more paths as needed

  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && isAuthenticatedCookie === "false" && pathIsProtected) {
    router.push("/login");
  }

  return children;
};

export default ProtectedRoutes;
