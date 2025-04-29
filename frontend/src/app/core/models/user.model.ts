export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  department?: string;
  role: string;
  active: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
} 