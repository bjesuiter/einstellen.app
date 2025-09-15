import { createFileRoute } from "@tanstack/solid-router";
import Counter from "~/components/Counter";
import { Nav } from '~/components/Nav';

export const Route = createFileRoute("/")({
  component: RouteComponent, 
});

function RouteComponent() {
  return (
    <main class='p-2'>
      <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
