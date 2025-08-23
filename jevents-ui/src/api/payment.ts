import { axiosPrivate } from "@/axios/instance";
import {
  CreatePaymentRequest,
  Payment,
  UpdatePaymentRequest,
} from "@/types/payment";

export const createPayment = async (
  body: CreatePaymentRequest
): Promise<Payment> => {
  const res = await axiosPrivate.post<Payment>("/payments", {
    payment: body,
  });
  return res.data;
};

export const updatePayment = async (
  id: number,
  body: UpdatePaymentRequest
): Promise<Payment> => {
  const res = await axiosPrivate.put<Payment>(`/payments/${id}`, {
    payment: body,
  });
  return res.data;
};
