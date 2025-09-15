"use server";
import { envStore } from "../lib/envStore";

/**
 * Server function that safely exposes only the STAGE value to the client
 * This prevents the entire envStore (with sensitive data) from being sent to the client
 */
export async function getStage(): Promise<string> {
  return envStore.STAGE;
}

/**
 * Server function that checks if running on Deno Deploy
 */
export async function getIsRunningOnDenoDeploy(): Promise<boolean> {
  return envStore.STAGE === "deno_deploy";
}
