import { API_ENDPOINTS } from "@/shared/config";
import { OrderListApiResponseSchema } from "@/entities/order/models/schema";
import { fetchWithAuthAndValidate } from "../_lib/apiHandler";

export async function GET() {
  return fetchWithAuthAndValidate(API_ENDPOINTS.order.getOrders, OrderListApiResponseSchema);
}
