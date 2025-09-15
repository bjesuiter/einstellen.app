import { RouterProvider } from "@tanstack/solid-router";
import { router } from "./router";

import "./app.css";

/**
 * @bjesuiter: SolidJS APP entrypoint (rendered hierarchically after entry-server.tsx and entry-client.tsx)
 * Single Purpose: Render the Tanstack RouterProvider which loads the file system routes for itself. 
 * Entrypoint for tanstack router: the ./routes/__root.tsx file
 */
export default function App() {
  return <RouterProvider router={router} />;
}
