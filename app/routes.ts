import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("admin", "pages/admin.tsx"),
  route("documentation", "pages/documentation.tsx"),
  route("Contact-Us", "pages/Contact Us.tsx"),
  route("terms-and-conditions", "pages/terms-and-conditions.tsx"),
  route("privacy-policy", "pages/privacy-policy.tsx"),
  route("refund-policy", "pages/refund-policy.tsx"),
] satisfies RouteConfig;
