export enum UserRole {
  SUPER = "super",
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
