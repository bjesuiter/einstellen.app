import { createRouter as createTanstackSolidRouter, Link } from "@tanstack/solid-router";
import { routeTree } from "./routeTree.gen";


export function createRouter() {
  const router = createTanstackSolidRouter({
    defaultErrorComponent: err => <div>{err.error.stack}</div>,
    defaultNotFoundComponent: () => <div>Something was not found, please go back to root.
      <Link to="/">Go to home</Link>
    </div>,
    routeTree,
    defaultPreload: "intent",
    defaultStaleTime: 5000,
    scrollRestoration: true
  });
  return router;
}

// @bjesuiter: this router is the tanstack router instance
export const router = createRouter();

// Register things for typesafety
declare module "@tanstack/solid-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
