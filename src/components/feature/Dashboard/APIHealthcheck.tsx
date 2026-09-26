"use client";

import { useEffect, useState } from "react";
import { getApiHealth } from "@/services/healthService";
import styles from "./APIHealthcheck.module.css";

function APIStatus() {
  const [health, setHealth] = useState<{ live: boolean; ready: boolean } | null>(null);

  useEffect(() => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;

    async function refresh() {
      try {
        const result = await getApiHealth();
        if (!stopped) setHealth(result);
      } catch {
        if (!stopped) setHealth({ live: false, ready: false });
      } finally {
        if (!stopped) timer = setTimeout(refresh, 5000);
      }
    }

    void refresh();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, []);

  function indicator(value: boolean | undefined, good: string, bad: string) {
    const state = value === undefined ? "checking" : value ? "healthy" : "unhealthy";
    return <span className={`${styles.indicator} ${styles[state]}`}>
      {value === undefined ? "Checking…" : value ? good : bad}
    </span>;
  }

  return (
    <div aria-live="polite">
      <table>
        <caption>API STATUS</caption>
        <tbody>
          <tr>
            <th scope="row">LIVE:</th>
            <td>{indicator(health?.live, "Live", "Unavailable")}</td>
          </tr>
          <tr>
            <th scope="row">READY:</th>
            <td>{indicator(health?.ready, "Healthy", "Unhealthy")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export const APIHealth = { APIStatus };
