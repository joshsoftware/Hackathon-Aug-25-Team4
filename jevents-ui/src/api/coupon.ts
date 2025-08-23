import { axiosPrivate } from "@/axios/instance";

export interface ApplyCouponRequest {
  event_id: number;
  total_amount: number;
  coupon_code: string;
}

export interface ApplyCouponResponse {
  discounted_price: number;
}

export const applyCoupon = async (
  body: ApplyCouponRequest
): Promise<ApplyCouponResponse> => {
  const { event_id, ...rest } = body;
  return axiosPrivate
    .post<ApplyCouponResponse>(`/events/${event_id}/coupons/apply`, rest)
    .then((res) => res.data);
};

export interface CouponCreateRequest {
  code: string;
  discount_value: number;
  discount_type: "percentage" | "fixed";
  usage_limit: number;
  valid_from: string; // ISO string
  valid_until: string; // ISO string
  active: boolean;
}

export interface CouponCreateResponse {
  id: number;
  code: string;
  discount_value: number;
  discount_type: "percentage" | "fixed";
  usage_limit: number;
  valid_from: string;
  valid_until: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export const createCoupon = async (
  event_id: number,
  coupon: CouponCreateRequest
): Promise<CouponCreateResponse> => {
  return axiosPrivate
    .post<CouponCreateResponse>(`/events/${event_id}/coupons`, { coupon })
    .then((res) => res.data);
};
