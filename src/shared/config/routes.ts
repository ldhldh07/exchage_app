export const ROUTES = {
  home: "/",
  login: "/login",
  history: "/history",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
