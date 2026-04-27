export const API_ROUTES = {
  BASE: "/api",
  AUTH: {
    BASE: "/auth",
    REGISTER: "/register",
    LOGIN: "/login",
    REFRESH_TOKEN: "/refresh-token",
    LOGOUT: "/logout",
    ME: "/me",
  },
  ITEMS: {
    BASE: "/items",
    ROOT: "/", 
    SEARCH: "/search",
    BY_ID: "/:itemId",
  },
  CUSTOMERS: {
    BASE: "/customers",
    ROOT: "/",
    BY_ID: "/:customerId",
    LEDGER: "/customer/:customerId", 
  },
  SALES: {
    BASE: "/sales",
    ROOT: "/",
  }
};
