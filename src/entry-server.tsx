// @refresh reload
import { createHandler, FetchEvent, StartServer } from "@solidjs/start/server";
import { createMemoryHistory } from "@tanstack/solid-router";
import { router } from "./router";


const routerLoad = async (event: FetchEvent) => {
  const url = new URL(event.request.url);
  const path = url.href.replace(url.origin, "");

  // This only primes the tanstack router for the given path from the request 
  // The "real" mounting happens via the <RouterProvider /> component in the /src/app.tsx file, which is auto-discovered by solidjs start

  router.update({
    history: createMemoryHistory({
      initialEntries: [path]
    })
  });

  await router.load();
};

// @bjesuiter: SolidJS SERVER ENTRYPOINT, renders the SoliJS Server
// primes the tanstack router for the given path from the request with the routerLoad function
// seeks the app.tsx file in the src folder and uses it as the root component to render
export default createHandler(
  () => (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body class="bg-surface-secondary-light dark:bg-surface-secondary-dark h-[100dvh] w-[100dvw] text-foreground-light dark:text-foreground-dark overflow-y-auto">
            <div id="app" class="h-full">{children}</div>
            {scripts}
          </body>
        </html>
      )}
    />
  ),
  undefined,
  routerLoad
);
