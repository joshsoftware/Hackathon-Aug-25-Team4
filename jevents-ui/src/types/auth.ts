// Login
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// SignUp
export interface SignUpRequest {
  user: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
  };
}

export interface SignUpResponse {
  token: string;
  user: User;
}

// Extra
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface UserLocalStorage {
  token: string;
  user: User;
}
