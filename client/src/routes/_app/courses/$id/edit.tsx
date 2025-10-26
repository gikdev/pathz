import { AppBar } from "#/components/app-bar"
import { list, phonePage } from "#/shared/skins"
import { SpinnerGapIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { CourseForm, select } from "../-course-form"
import { useNavigateTo } from "#/shared/hooks"
import { GoBackBtn } from "#/components/go-back-btn"
import { ErrorParagraph } from "#/components/error-paragraph"
import { coursesControllerFindOneByIdWithLessonsV1Options } from "#/api-client"

export const Route = createFileRoute("/_app/courses/$id/edit")({
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
  const navBack = useNavigateTo(nav =>
    nav({ to: "/courses/$id", params: { id } }),
  )
  const {
    data: defaultValues,
    isError,
    refetch,
  } = useQuery({
    ...coursesControllerFindOneByIdWithLessonsV1Options({ path: { id } }),
    select,
  })

  return (
    <div className={phonePage()}>
      <AppBar title="ویرایش دوره" slotStart={<GoBackBtn onClick={navBack} />} />

      <div className={list()}>
        {isError && <ErrorParagraph onClick={refetch} />}

        {defaultValues ? (
          <CourseForm
            mode="edit"
            courseId={id}
            defaultValues={defaultValues}
            onSuccess={navBack}
          />
        ) : (
          <SpinnerGapIcon size={40} className="animate-spin" />
        )}
      </div>
    </div>
  )
}
