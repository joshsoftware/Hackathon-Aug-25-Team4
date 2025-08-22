import { axiosPublic } from "@/axios/instance";
import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from "@/types/auth";

export const login = async (body: LoginRequest): Promise<LoginResponse> => {
  return axiosPublic
    .post<LoginResponse>("/auth/login", body)
    .then((res) => res.data);
};

export const signup = async (body: SignUpRequest): Promise<SignUpResponse> => {
  return axiosPublic
    .post<SignUpResponse>("/users", body)
    .then((res) => res.data);
};
