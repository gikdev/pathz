import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/courses/$id/edit")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return <div>Hello "/_app/courses/{id}/edit"!</div>
}
