"use server";

import { apiGet } from "./apiClient";
import type { User } from "../models/user";

export async function getUsers(): Promise<User[]> {
  const users = await apiGet<User[]>("/user");
  if (!Array.isArray(users)) {
    throw new Error("The users API did not return an array.");
  }
  return users;
}
