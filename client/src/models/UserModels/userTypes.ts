export interface registrationUser {
  name: string;
  email: string;
  confirmPassword: string;
  password: string;
  avatar?: any;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  role: string;
  isBlocked: boolean;
  isConfirmed: boolean;
}

export interface updateUser {
  name: string;
  password: string;
  avatar?: any;
}

export interface ResponseMessage {statusCode: string, message: string}

export interface SendChangePasswordData {password: string, newPassword: string}

export interface ResetPasswordData {email: string, code: string, password: string}
