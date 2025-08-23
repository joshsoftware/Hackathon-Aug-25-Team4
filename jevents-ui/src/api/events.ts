import { axiosPublic } from "@/axios/instance";
import {
  BookingsRequest,
  BookingsResponse,
  Event,
  EventDetail,
} from "@/types/events";

export const getEvents = async (userId: string | null): Promise<Event[]> => {
  let url = `/events`;
  if (userId) {
    url = `/events?user_id=${userId}`;
  }

  return axiosPublic.get<Event[]>(url).then((res) => res.data);
};

export const getEvent = async (eventID: string): Promise<EventDetail> => {
  return axiosPublic
    .get<EventDetail>(`/events/${eventID}`)
    .then((res) => res.data);
};

export const createBookings = async (
  body: BookingsRequest,
): Promise<BookingsResponse> => {
  return axiosPublic
    .post<BookingsResponse>("/bookings/bulk_create", body)
    .then((res) => res.data);
};
