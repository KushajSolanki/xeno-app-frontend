import api from "./api";

export const getProducts = async () => {
  return api.get("/shopify/products");
};

export const getCustomers = async () => {
  return api.get("/shopify/customers");
};

export const getOrders = async () => {
  return api.get("/shopify/orders");
};

export const getSummary = async () => {
  return api.get("/shopify/summary");
};

