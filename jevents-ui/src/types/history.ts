export interface UserHistory {
  id: number;
  user_id: number;
  event_id: number;
  coupon_id: number;
  total_amount: string;
  discount_applied: string;
  final_amount: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
  bookings: Booking[];
}

export interface Booking {
  id: number;
  user_id: number;
  ticket_id: number;
  name: string;
  count: number | null;
  order_id: number;
  created_at: string;
  updated_at: string;
  ticket: Ticket;
}

export interface Ticket {
  id: number;
  name: string;
  event_id: number;
  user_id: number;
  price: string;
  status: number;
  opening_start: string;
  opening_end: string;
  created_at: string;
  updated_at: string;
  capacity: number;
  available: number;
  event: Event;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  status: number;
  category: string;
  created_at: string;
  updated_at: string;
  image_url: string | null;
}
