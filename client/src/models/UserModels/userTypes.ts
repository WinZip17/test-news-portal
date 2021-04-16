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
}
