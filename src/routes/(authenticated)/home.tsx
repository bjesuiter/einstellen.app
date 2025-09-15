import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/(authenticated)/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/home"!</div>
}
