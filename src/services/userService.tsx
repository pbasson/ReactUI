"use server";

import { apiGet, apiPost, apiPut } from "./apiClient";
import type { UsersResponse, User, CreateUserRequest } from "../models/User";

export async function getUsers(): Promise<UsersResponse> {
  const users = await apiGet<UsersResponse>("/user");
  if ( !users || !Array.isArray(users.records) || !Number.isInteger(users.totalRecords) || users.totalRecords < 0) {
    throw new Error("The users API must return records and a non-negative totalRecords count.");
  }
  return users;
}

export async function createUser(data: CreateUserRequest) {
  await apiPost("/user", data);
}

export async function updateUser(data: User) {
  await apiPut(`/user/${data.id}`, data);
}