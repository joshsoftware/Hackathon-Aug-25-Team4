export interface Order {
  id: number;
  user_id: number;
  event_id: number;
  coupon_id?: number | null;
  total_amount: number;
  discount_applied: number;
  final_amount: number;
  payment_status: "pending" | "paid" | "failed" | "refunded" | "partial_refunded";
  created_at: string;
  updated_at: string;
}

export interface CreateOrderRequest {
  user_id: number;
  event_id: number;
  coupon_id?: number | null;
  total_amount: number;
  discount_applied: number;
  final_amount: number;
  payment_status: "pending"; // on creation, it's usually pending
}

export interface UpdateOrderRequest {
  coupon_id?: number | null;
  total_amount?: number;
  discount_applied?: number;
  final_amount?: number;
  payment_status?: Order["payment_status"];
}

export interface OrderResponse {
  order: Order;
}

export interface OrdersResponse {
  orders: Order[];
}
