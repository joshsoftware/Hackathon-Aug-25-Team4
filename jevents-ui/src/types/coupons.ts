export interface Coupons {
  id: number;
  event_id: number;
  user_id: number;
  code: string;
  discount_value: string;
  discount_type: string;
  usage_limit: number;
  used_count: number;
  valid_from: string;
  valid_until: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}
