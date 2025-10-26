import { createFileRoute } from "@tanstack/react-router"
import { list, phonePage } from "#/shared/skins"
import { AppBar } from "#/components/app-bar"
import { CourseForm } from "./-course-form"
import { GoBackBtn } from "#/components/go-back-btn"
import { useNavigateTo } from "#/shared/hooks"

export const Route = createFileRoute("/_app/courses/new")({
  component: RouteComponent,
})

function RouteComponent() {
  const navBack = useNavigateTo(nav => nav({ to: "/courses" }))

  return (
    <div className={phonePage()}>
      <AppBar title="دوره جدید" slotStart={<GoBackBtn onClick={navBack} />} />

      <div className={list()}>
        <CourseForm mode="create" onSuccess={navBack} />
      </div>
    </div>
  )
}
