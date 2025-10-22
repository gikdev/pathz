import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/lessons/$id/edit")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/lessons/$id/edit"!</div>
}
