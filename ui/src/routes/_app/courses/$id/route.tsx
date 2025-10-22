import {
  createFileRoute,
  linkOptions,
  Outlet,
  redirect,
} from "@tanstack/react-router"

export const Route = createFileRoute("/_app/courses/$id")({
  component: RouteComponent,
  params: {
    parse: ({ id }) => {
      const num = Number(id)
      const finalId = Number.isNaN(num) ? 0 : num
      return { id: finalId }
    },
  },
  beforeLoad(p) {
    const { id } = p.params
    const { pathname } = p.location

    const forbiddenPath1 = linkOptions({
      to: "/courses/$id",
      params: { id },
    }).to.replace("$id", id.toString())
    const forbiddenPath2 = forbiddenPath1 + "/"

    const isForbidden = [forbiddenPath1, forbiddenPath2].includes(pathname)

    if (isForbidden)
      throw redirect({
        to: "/courses/$id/view",
        params: { id },
      })
  },
})

function RouteComponent() {
  return <Outlet />
}
