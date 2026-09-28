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

export interface UpdateUserRequest {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string | null;
}
