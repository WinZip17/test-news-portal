export interface UserInterfaces {
  id?: number;
  email: string;
  name: string;
  password?: string;
}

export interface RoleInterfaces {
  id?: number;
  name: string;
}

export interface getMeUserInterfaces {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  role: string
}
