export interface CreateEventRequest {
  event: Event;
  tickets: Ticket[];
}

export interface EventDetail {
  event: Event;
}

export interface Event {
  title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  category: string;
  image?: File | null;
  attendees?: number;
  revenue?: string;
}

export interface Ticket {
  name: string;
  price: number;
  status: number;
  opening_start: string;
  opening_end: string;
  capacity: number;
}
