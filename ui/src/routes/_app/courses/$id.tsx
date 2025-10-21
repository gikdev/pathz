import { coursesControllerFindOneByIdV1Options } from "#/api-client"
import { AppBar } from "#/components/app-bar"
import { CourseCard } from "#/components/course-card"
import { ErrorParagraph } from "#/components/error-paragraph"
import { GoBackInHistoryBtn } from "#/components/go-back-in-history-btn"
import { list, phonePage } from "#/shared/skins"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/courses/$id")({
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
  const {
    data: course,
    isSuccess,
    isPending,
    isError,
    refetch,
  } = useQuery(coursesControllerFindOneByIdV1Options({ path: { id } }))

  return (
    <div className={phonePage()}>
      <AppBar
        title={isSuccess ? course.title : "..."}
        slotStart={<GoBackInHistoryBtn />}
      />

      <div className={list()}>
        {isError && <ErrorParagraph onClick={() => void refetch()} />}

        {isPending && <CourseCard.ListSkeleton />}

        {isSuccess && course.title}
      </div>
    </div>
  )
}
