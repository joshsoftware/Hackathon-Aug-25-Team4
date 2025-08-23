import { axiosPublic } from "@/axios/instance";
import { Event } from "@/types/events";

export const getEvents = async (userId: string | null): Promise<Event[]> => {
  let url = `/events`;
  if (userId) {
    url = `/events?user_id=${userId}`;
  }

  return axiosPublic.get<Event[]>(url).then((res) => res.data);
};

export const getEvent = async (eventID: string): Promise<Event> => {
  return axiosPublic.get<Event>(`/events/${eventID}`).then((res) => res.data);
};
