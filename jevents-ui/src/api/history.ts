import { axiosPublic } from "@/axios/instance";
import { UserHistory } from "@/types/history";

export const getUserHisotry = async (): Promise<UserHistory[]> => {
  const url = `/orders`;
  return axiosPublic.get<UserHistory[]>(url).then((res) => res.data);
};
