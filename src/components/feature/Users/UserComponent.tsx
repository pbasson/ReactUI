"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/services/userService";
import type { UsersResponse } from "@/models/user";
import styles from "@/components/StyleSheets/AppStyles.module.css";


interface UserComponentProps { totalRecords: (count: number) => void; }

function UsersPage( { totalRecords} : UserComponentProps) {
  const [users, setUsers] = useState<UsersResponse>({ records: [], totalRecords: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      try {
        const data = await getUsers();
        if (!cancelled) {
          setUsers(data);
          totalRecords(data.totalRecords);
        }
      } catch {
        if (!cancelled) setError("Unable to load users. Please try again later.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadUsers();
    return () => { cancelled = true; };
  }, [totalRecords]);

return (
  <div>
    <div className={styles.sectionHeader}>
      <h2>Users</h2>
      {!loading && !error && (
        <span className={styles.countBadge}> {users.totalRecords} users </span>
      )}
    </div>

    {loading && <p role="status">Loading users…</p>}
    {error && <p role="alert">{error}</p>}

    {!loading && !error && (
      <>
        {users.totalRecords === 0 ? ( <p>No users found.</p>) : (

          <div className={styles.tableContainer}>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Full name</th>
                  <th>Date of birth</th>
                  <th>Email</th>
                </tr>
              </thead>

              <tbody>
                {users.records.map(user => (
                  <tr key={user.id}>
                    <td>{user.userName ?? "—"}</td>
                    <td>{[user.firstName, user.lastName].filter(Boolean).join(" ") ?? "-"} </td>
                    <td>{user.dateOfBirth ?? "—"}</td>
                    <td>{user.email ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    )}
  </div>
);
}

export default UsersPage;
