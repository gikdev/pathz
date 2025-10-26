import { lessonsControllerGetContentOfOneByIdV1Options } from "#/generated/api-client"
import { AppBar } from "#/components/app-bar"
import { ErrorParagraph } from "#/components/error-paragraph"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { phonePage, list } from "#/shared/skins"
import { SpinnerGapIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { WritingArea } from "./-area"

export const Route = createFileRoute("/_app/lessons/$id/write/")({
  component: RouteComponent,
  params: {
    parse: ({ id }) => {
      const num = Number(id)
      const finalId = Number.isNaN(num) ? 0 : num
      return { id: finalId }
    },
  },
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data, status, refetch } = useQuery(
    lessonsControllerGetContentOfOneByIdV1Options({ path: { id } }),
  )

  switch (status) {
    case "error":
      return <ErrorParagraph onClick={refetch} />

    case "pending":
      return <SpinnerGapIcon size={40} className="animate-spin" />

    case "success":
      return (
        <div className={phonePage({ className: "relative" })}>
          <AppBar
            title="نوشتن"
            slotStart={
              <GoBackNavBtn
                onClick={nav => nav({ to: "/lessons/$id", params: { id } })}
              />
            }
          />

          <div className={list()}>
            <WritingArea initialPieces={data.content} />
          </div>
        </div>
      )

    default:
      return "Switch default!"
  }
}
