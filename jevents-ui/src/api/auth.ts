import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from "@/types/auth";

export const login = async (body: LoginRequest): Promise<LoginResponse> => {
  return {
    token: "hello",
    user: {
      id: 1,
      name: "",
      email: "hi",
      role: "organizer",
    },
  };
};

export const signup = async (body: SignUpRequest): Promise<SignUpResponse> => {
  return {
    token: "hello",
    user: {
      id: 1,
      name: "",
      email: "hi",
      role: "",
    },
  };
};
