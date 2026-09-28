export interface User {
  id: number;
  userName: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  dateOfBirth: string | null;
}

export interface UsersResponse {
  records: User[];
  totalRecords: number;
}

export type CreateUserRequest = Omit<User, "id">;