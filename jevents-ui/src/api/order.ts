import { axiosPublic } from "@/axios/instance";
import {
  CreateOrderRequest,
  Order,
  UpdateOrderRequest,
} from "@/types/order";

export const getOrders = async (): Promise<Order[]> => {
  const res = await axiosPublic.get<Order[]>("/orders");
  return res.data;
};

export const getOrderById = async (id: number): Promise<Order> => {
  const res = await axiosPublic.get<Order>(`/orders/${id}`);
  return res.data;
};

export const createOrder = async (
  body: CreateOrderRequest
): Promise<Order> => {
  const res = await axiosPublic.post<Order>("/orders", { order: body });
  return res.data;
};

export const updateOrder = async (
  id: number,
  body: UpdateOrderRequest
): Promise<Order> => {
  const res = await axiosPublic.put<Order>(`/orders/${id}`, { order: body });
  return res.data;
};
