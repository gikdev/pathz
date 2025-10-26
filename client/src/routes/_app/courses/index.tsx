import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { coursesControllerFindAllV1Options } from "#/api-client"
import { list, phonePage } from "#/shared/skins"
import { AppBar } from "#/components/app-bar"
import { CourseCard } from "#/components/course-card"
import { ErrorParagraph } from "#/components/error-paragraph"
import { BottomTabs } from "#/components/bottom-tabs"
import { Can } from "#/features/auth"
import { PlusIcon } from "@phosphor-icons/react"
import { FabMenu, type FabItem } from "#/components/fab-menu"
import { useMemo, useState } from "react"

export const Route = createFileRoute("/_app/courses/")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const [isFabOpen, setFabOpen] = useState(false)
  const {
    data: courses,
    isSuccess,
    isPending,
    isError,
    refetch,
  } = useQuery(coursesControllerFindAllV1Options())

  const isEmpty = isSuccess && courses.length === 0
  const isFull = isSuccess && courses.length !== 0

  const items = useMemo(
    () =>
      [
        {
          key: "new",
          label: "دوره جدید",
          theme: "secondary-success",
          icon: PlusIcon,
          onClick: () => navigate({ to: "/courses/new" }),
          closeAfterClick: true,
        },
      ] satisfies FabItem[],
    [],
  )

  return (
    <div className={phonePage()}>
      <AppBar title="دوره‌ها" />

      <div className={list({ className: "relative" })}>
        {isError && <ErrorParagraph onClick={() => void refetch()} />}

        {isPending && <CourseCard.ListSkeleton />}

        {isEmpty && <CourseCard.Empty />}

        {isFull && <CourseCard.List courses={courses} />}

        <Can I="MANAGE" a="COURSE">
          <FabMenu
            items={items}
            isOpen={isFabOpen}
            onClick={() => setFabOpen(p => !p)}
          />
        </Can>
      </div>

      <BottomTabs />
    </div>
  )
}
