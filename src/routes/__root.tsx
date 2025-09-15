import { HeadContent, Link, Outlet, createRootRoute } from "@tanstack/solid-router";

import { clientOnly } from "@solidjs/start";
import { Suspense } from "solid-js";
import { Portal } from 'solid-js/web';
import { getStage, getIsRunningOnDenoDeploy } from '~/server/serverInfo';


const Devtools = clientOnly(() => import("../components/Devtools"));

export const Route = createRootRoute({
  component: RootComponent,
  // CAUTION: this head function runs on the server AND the client! 
  // make sure to only use server-only functions here 
  // (which automatically run as simple functions on the server and do api calls from client-side functions)
  head: async () => {
    let title = "Einstellen";
    const isRunningOnDenoDeploy = await getIsRunningOnDenoDeploy();
    if (!isRunningOnDenoDeploy) {
      const stage = await getStage();
      title += ` (${stage})`;
    }
    return {
      meta: [
        {
          title: title
        }
      ]
    }
  }
});

function RootComponent() {
  return (
    <>
    {/* 
      Note: This portals the (tanstack) HeadContent component into the "head" tag of the document, because 
      we cannot use the HeadContent component directly in the entry-server.tsx file because it needs to be below <RouterProvider /> in the tree. 
      <RouterProvider /> is in the App.tsx file, which is auto-discovered by solidjs start.
      But the code needs to go into the document.head tag to work correctly. 
     */}
      <Portal mount={document.head}>
        <HeadContent />
      </Portal>
      <Link to="/">Index</Link>
      <Link to="/about">About</Link>
      <Suspense>
        <Outlet />
        <Devtools />
      </Suspense>
    </>
  );
}
