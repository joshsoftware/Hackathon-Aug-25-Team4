export interface Payment {
  id: number;
  order_id: number;
  method: "upi" | "credit_card" | "debit_card" | "netbanking" | "coupon";
  transaction_id: string;
  amount: number;
  status: "initiated" | "success" | "failed" | "refunded";
  created_at: string;
  updated_at: string;
}

export interface CreatePaymentRequest {
  order_id: number;
  method: Payment["method"];
  transaction_id: string;
  amount: number;
  status: Payment["status"];
}

export interface UpdatePaymentRequest {
  method?: Payment["method"];
  status?: Payment["status"];
}

export interface PaymentResponse {
  payment: Payment;
}
