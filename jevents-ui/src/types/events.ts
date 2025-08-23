import { User } from "./auth";

export interface CreateEventRequest {
  event: {
    title: string;
    description: string;
    location: string;
    start_time: string;
    end_time: string;
    category: string;
    image?: File | null;
  };
  tickets: Ticket[];
}

export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  category: string;
  image?: File | null;
  attendees?: number;
  revenue?: string;
  image_url?: string | null;
}

export interface Ticket {
  name: string;
  price: number;
  status: number;
  opening_start: string;
  opening_end: string;
  capacity: number;
}

export interface EventDetail {
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
  tickets: TicketDetail[];
  coupons: CoupounDetail[] | null;
  organizers: User[];
}

export interface TicketDetail {
  id: number;
  name: string;
  event_id: number;
  user_id: number;
  price: string;
  status: string;
  opening_start: string;
  opening_end: string;
  created_at: string;
  updated_at: string;
  capacity: number;
  available: number;
}

export interface CoupounDetail {
  id: number;
}
