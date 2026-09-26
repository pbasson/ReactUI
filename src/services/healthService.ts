"use server";

import { apiFetch } from "./apiClient";

export async function getApiHealth(): Promise<{ live: boolean; ready: boolean }> {
  async function check(probe: "live" | "ready"): Promise<boolean> {
    try {
      const base = process.env.API_HEALTH_BASE_URL || process.env.API_BASE_URL || "http://localhost:5820";
      // Health endpoints are at the server root, outside the /api prefix.
      const origin = new URL(base).origin;
      const prefix = process.env.API_HEALTH_URL || "health";
      const response = await apiFetch(probe, {
        baseUrl: origin,
        prefix,
        timeoutMs: 5000,
      });
      const status = (await response.text()).trim().toLowerCase();
      return probe === "live" || status === "healthy";
    } catch {
      return false;
    }
  }

  const [live, ready] = await Promise.all([check("live"), check("ready")]);
  return { live, ready };
}
