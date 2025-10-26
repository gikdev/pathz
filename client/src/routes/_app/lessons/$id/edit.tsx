import { AppBar } from "#/components/app-bar"
import { GoBackBtn } from "#/components/go-back-btn"
import { useNavigateTo } from "#/shared/hooks"
import { phonePage, list } from "#/shared/skins"
import { createFileRoute } from "@tanstack/react-router"
import { LessonForm, select } from "../-lesson-form"
import { useQuery } from "@tanstack/react-query"
import { lessonsControllerFindOneByIdWithPiecesV1Options } from "#/generated/api-client"
import { SpinnerGapIcon } from "@phosphor-icons/react"

export const Route = createFileRoute("/_app/lessons/$id/edit")({
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
  const { data: defaultValues } = useQuery({
    ...lessonsControllerFindOneByIdWithPiecesV1Options({ path: { id } }),
    select,
  })
  const navBack = useNavigateTo(nav =>
    nav({ to: "/lessons/$id", params: { id } }),
  )

  return (
    <div className={phonePage()}>
      <AppBar title="ویرایش درس" slotStart={<GoBackBtn onClick={navBack} />} />

      <div className={list()}>
        {defaultValues ? (
          <LessonForm
            mode="edit"
            courseId={id}
            onSuccess={navBack}
            defaultValues={defaultValues}
          />
        ) : (
          <SpinnerGapIcon size={40} className="animate-spin" />
        )}
      </div>
    </div>
  )
}
