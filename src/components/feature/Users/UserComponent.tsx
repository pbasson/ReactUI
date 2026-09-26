"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/services/userService";
import type { User } from "@/models/user";

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      try {
        const data = await getUsers();
        if (!cancelled) setUsers(data);
      } catch {
        if (!cancelled) setError("Unable to load users. Please try again later.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {loading && <p role="status">Loading users…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && users.length === 0 && <p>No users found.</p>}
      {users.map(user => (
        <div key={user.id}>
          {[user.firstName, user.lastName].filter(Boolean).join(" ") ||
            user.userName || `User ${user.id}`}
        </div>
      ))}
    </div>
  );
}

export default UsersPage;
