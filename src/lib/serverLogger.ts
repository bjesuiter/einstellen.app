import { type IMeta, Logger } from "tslog";

export const serverLogger = new Logger<string>({
    name: "server",
    type: "pretty",
    overwrite: {
        addPlaceholders: (
            logObjMeta: IMeta,
            placeholderValues: Record<string, string | number>,
        ) => {
            placeholderValues["newline"] = "\n";
        },
    },
    // Available template vars:
    // https://tslog.js.org/#/?id=pretty-templates-and-styles-color-settings
    prettyLogTemplate: import.meta.env.MODE === "production"
        ? `{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}} [{{name}}] {{logLevelName}}: {{newline}}`
        : `{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}} [{{name}}] {{logLevelName}}: {{newline}}`,
});
