export enum UserType {
  User = 1,
  Admin = 2,
}

export interface User {
  phone: string;
  user_type: UserType;
  access: string;
  refresh: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user_type: UserType;
}

export interface VerificationResponse {
  result: string;
}