"use server";

import { apiGet, apiPost, apiPut } from "./apiClient";
import type { UsersResponse, UpdateUserRequest, CreateUserRequest } from "../models/User";

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

export async function updateUser(data: UpdateUserRequest): Promise<{ success: boolean; message: string }> {
  if (!Number.isInteger(data.id) || data.id <= 0 ||
      !data.userName?.trim() || !data.firstName?.trim() || !data.lastName?.trim() ||
      !data.email?.trim()) {
    return { success: false, message: "Username, first name, last name, and email are required." };
  }

  try {
    const result = await apiPut<{ success: boolean; message: string | null }>("/user/update", {
      id: data.id,
      userName: data.userName.trim(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      dateOfBirth: data.dateOfBirth || null,
    });
    if (result?.success !== true) {
      return { success: false, message: result?.message || "The API did not confirm the update. Please refresh the list before retrying." };
    }
    return { success: true, message: result.message || "User updated." };
  } catch (error) {
    console.error("User update failed:", error instanceof Error ? error.message : String(error));
    return { success: false, message: "Unable to confirm the update. Please refresh the list before retrying." };
  }
}
