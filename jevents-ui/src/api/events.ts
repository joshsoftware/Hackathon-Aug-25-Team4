import { axiosPublic } from "@/axios/instance";
import { Event, EventDetail } from "@/types/events";

export const getEvents = async (userId: string | null): Promise<Event[]> => {
  let url = `/events`;
  if (userId) {
    url = `/events?user_id=${userId}`;
  }

  return axiosPublic.get<Event[]>(url).then((res) => res.data);
};

export const getEvent = async (eventID: string): Promise<EventDetail> => {
  return axiosPublic.get<EventDetail>(`/events/${eventID}`).then((res) => res.data);
};
