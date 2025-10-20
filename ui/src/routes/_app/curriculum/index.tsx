import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { curriculumStepsControllerFindAllWithLessonsV1Options } from "#/api-client"
import { list, phonePage } from "#/shared/skins"
import { AppBar } from "#/components/app-bar"
import { LessonCard } from "#/components/lesson-card"
import { ErrorParagraph } from "#/components/error-paragraph"
import { BottomTabs } from "#/components/bottom-tabs"

export const Route = createFileRoute("/_app/curriculum/")({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: steps,
    isSuccess,
    isPending,
    isError,
    refetch,
  } = useQuery(curriculumStepsControllerFindAllWithLessonsV1Options())

  const isEmpty = isSuccess && steps.length === 0
  const isFull = isSuccess && steps.length !== 0

  return (
    <div className={phonePage()}>
      <AppBar title="مسیر" />

      <div className={list()}>
        {isError && <ErrorParagraph onClick={() => void refetch()} />}

        {isPending && <LessonCard.ListSkeleton />}

        {isEmpty && <LessonCard.Empty />}

        {isFull && <LessonCard.List lessons={steps.map(s => s.lesson)} />}
      </div>

      <BottomTabs />
    </div>
  )
}
