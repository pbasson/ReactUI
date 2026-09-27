"use server";

import { apiGet } from "./apiClient";
import type { UsersResponse } from "../models/user";

export async function getUsers(): Promise<UsersResponse> {
  const users = await apiGet<UsersResponse>("/user");
  if (
    !users ||
    !Array.isArray(users.records) ||
    !Number.isInteger(users.totalRecords) ||
    users.totalRecords < 0
  ) {
    throw new Error("The users API must return records and a non-negative totalRecords count.");
  }
  return users;
}
