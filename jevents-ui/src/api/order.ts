import { axiosPrivate, axiosPublic } from "@/axios/instance";
import {
  CreateOrderRequest,
  Order,
  StatsResponse,
  UpdateOrderRequest,
} from "@/types/order";

export const getOrders = async (): Promise<Order[]> => {
  const res = await axiosPrivate.get<Order[]>("/orders");
  return res.data;
};

export const getOrderById = async (id: number): Promise<Order> => {
  const res = await axiosPrivate.get<Order>(`/orders/${id}`);
  return res.data;
};

export const createOrder = async (body: CreateOrderRequest): Promise<Order> => {
  const res = await axiosPrivate.post<Order>("/orders", { order: body });
  return res.data;
};

export const updateOrder = async (
  id: number,
  body: UpdateOrderRequest
): Promise<Order> => {
  const res = await axiosPrivate.put<Order>(`/orders/${id}`, { order: body });
  return res.data;
};

export const getStats = async (user_id: number): Promise<StatsResponse> => {
  const res = await axiosPrivate.get<StatsResponse>(
    `/orders/stats?user_id=${user_id}`
  );
  return res.data;
};
