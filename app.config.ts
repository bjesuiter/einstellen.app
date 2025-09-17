import { defineConfig } from "@solidjs/start/config";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // TODO: check if this ssr: true even does anything
  ssr: true,
  middleware: "src/global-middleware.ts",
  vite: {
    plugins: [
      tailwindcss(),
      tanstackRouter({
        target: "solid",
        // TODO: check: CodeSplitting evtl. not needed since we are using it on the server?
        // autoCodeSplitting: true
      }),
    ],
  },
  server: {
    experimental: {
      websocket: true,
    },
  },
}).addRouter({
  name: "ws",
  base: "/ws",
  type: "http",
  handler: "./src/ws/websocket.handler.ts",
  target: "server",
});
