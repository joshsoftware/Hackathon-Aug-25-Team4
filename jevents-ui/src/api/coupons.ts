import { axiosPrivate } from "@/axios/instance";
import { Coupons } from "@/types/coupons";

export const getCoupons = async (
  eventId: number | null,
): Promise<Coupons[]> => {
  const url = `/events/${eventId}/coupons`;
  return axiosPrivate.get<Coupons[]>(url).then((res) => res.data);
};
