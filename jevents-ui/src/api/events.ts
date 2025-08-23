import { axiosPublic } from "@/axios/instance";
import { Event, EventDetail } from "@/types/events";

export const getEvents = async (userId: string | null): Promise<Event[]> => {
  return axiosPublic
    .get<Event[]>(`/events?user_id=${userId}`)
    .then((res) => res.data);
};

export const getEvent = async (eventID: string): Promise<EventDetail> => {
  return axiosPublic
    .get<EventDetail>(`/event/${eventID}`)
    .then((res) => res.data);
};
