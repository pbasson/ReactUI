"use server";

import { apiFetch } from "./apiClient";

export async function getApiHealth(): Promise<{ live: boolean; ready: boolean }> {
  async function check(probe: "live" | "ready"): Promise<boolean> {
    try {
      const prefix = process.env.API_HEALTH_URL || "health";
      const response = await apiFetch(probe, {
        prefix,
        timeoutMs: 5000,
      });
      const status = (await response.text()).trim().toLowerCase();
      return probe === "live" || status === "healthy";
    } catch (error) {
      console.error(`[Health] ${probe} check failed:`, error instanceof Error ? error.message : String(error));
      return false;
    }
  }

  const [live, ready] = await Promise.all([check("live"), check("ready")]);
  return { live, ready };
}
