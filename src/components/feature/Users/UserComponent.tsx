"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/components/StyleSheets/AppStyles.module.css";
import RequestStatus from "@/components/common/RequestStatus";
import { getUsers } from "@/services/userService";
import type { UsersResponse } from "@/models/user";


interface UserComponentProps { totalRecords: (count: number) => void; }

function UsersPage({ totalRecords }: UserComponentProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<UsersResponse>({ records: [], totalRecords: 0 });
  const requestId = useRef(0);

  const loadData = useCallback(async () => {
    const currentRequest = ++requestId.current;
    setLoading(true);
    setError(null);

    try {
      const data = await getUsers();
      if (currentRequest !== requestId.current) return;
      setResponse(data);
      totalRecords(data.totalRecords);
    } catch {
      if (currentRequest === requestId.current) {
        setError("Unable to load data. Please try again later.");
      }
    } finally {
      if (currentRequest === requestId.current) setLoading(false);
    }
  }, [totalRecords]);

  useEffect(() => {
    void loadData();
    return () => {
      requestId.current += 1;
    };
  }, [loadData]);

return (
  <div>
    <div className={styles.sectionHeader}>
      <h2>Users</h2>
      {!loading && !error && (
        <span className={styles.countBadge}> {response.totalRecords} users </span>
      )}
      <button type="button" className="btn btn-outline-primary" onClick={() => void loadData()}
        disabled={loading} > {loading ? "Loading…" : "Refresh"}
      </button>
    </div>

    <RequestStatus loading={loading} error={error} loadingMessage="Loading users…" />

    {!loading && !error && (
      <>
        {response.totalRecords === 0 ? ( <p>No users found.</p>) : (

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
                {response.records.map(user => (
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
