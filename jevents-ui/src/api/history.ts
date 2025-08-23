import { axiosPrivate, axiosPublic } from "@/axios/instance";
import { UserHistory } from "@/types/history";

export const getUserHisotry = async (): Promise<UserHistory[]> => {
  const url = `/orders`;
  return axiosPrivate.get<UserHistory[]>(url).then((res) => res.data);
};
