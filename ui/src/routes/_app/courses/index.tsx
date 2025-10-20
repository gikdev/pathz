import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { coursesControllerFindAllV1Options } from "#/api-client"
import { iconBtn, list, phonePage } from "#/shared/skins"
import { AppBar } from "#/components/app-bar"
import { CourseCard } from "#/components/course-card"
import { ErrorParagraph } from "#/components/error-paragraph"
import { BottomTabs } from "#/components/bottom-tabs"
import { Can } from "#/features/auth"
import { PlusIcon } from "@phosphor-icons/react"

export const Route = createFileRoute("/_app/courses/")({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: courses,
    isSuccess,
    isPending,
    isError,
    refetch,
  } = useQuery(coursesControllerFindAllV1Options())

  const isEmpty = isSuccess && courses.length === 0
  const isFull = isSuccess && courses.length !== 0

  return (
    <div className={phonePage()}>
      <AppBar
        title="دوره‌ها"
        slotStart={
          <Can I="MANAGE" a="COURSE">
            <Link to="/" className={iconBtn()}>
              <PlusIcon />
            </Link>
          </Can>
        }
      />

      <div className={list()}>
        {isError && <ErrorParagraph onClick={() => void refetch()} />}

        {isPending && <CourseCard.ListSkeleton />}

        {isEmpty && <CourseCard.Empty />}

        {isFull && <CourseCard.List courses={courses} />}
      </div>

      <BottomTabs />
    </div>
  )
}
