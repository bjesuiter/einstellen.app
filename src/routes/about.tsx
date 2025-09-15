import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <main class='p-2'>
      <h1>About</h1>
    </main>
  );
}
