import * as v from "valibot";

const EnvSchema = v.object({
    // Note: deno_deploy now denotes deno deploy EA 
    STAGE: v.optional(v.picklist(["local", "deno_deploy", "undefined"]), "undefined"),
    CLERK_SECRET_KEY: v.string(),
    VITE_CLERK_PUBLISHABLE_KEY: v.string(),
    // ROOT_USER_EMAIL: v.pipe(v.string(), v.email()),
    // ROOT_USER_PASSWORD: v.string(),
})

function initEnvStore(envs: NodeJS.ProcessEnv) {
    // This will throw if the envs are not valid
    const parsedEnv = v.parse(EnvSchema, envs);

    return {
        ...parsedEnv,
        STAGE: parsedEnv.STAGE || "undefined"
    }
}

// the export of my env store
export const envStore = initEnvStore(process.env);

// some shortcuts for common checks
export const isRunningOnDenoDeploy = envStore.STAGE === "deno_deploy";
export const isRunningLocally = envStore.STAGE === "local";