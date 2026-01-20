import { apiClient } from "@/shared/lib/apiClient";
import { API_ROUTES } from "@/shared/config";
import type { OrderResponse } from "../models/schema";

export const getOrders = () =>
  apiClient<OrderResponse[]>(API_ROUTES.orders);
