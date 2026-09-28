export interface User {
  id: number;
  userName: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  /** Date-only value in YYYY-MM-DD format, without a time or timezone. */
  dateOfBirth: string | null;
  isActive: boolean;
}

export interface UsersResponse {
  records: User[];
  totalRecords: number;
}
