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
