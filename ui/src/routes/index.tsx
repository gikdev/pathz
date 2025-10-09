import { createFileRoute } from "@tanstack/react-router"
import { list, page } from "../shared/skins"
import { AppBar } from "../components/app-bar"
import { BottomTabs } from "../components/bottom-tabs"

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={page()}>
      <AppBar title="خانه" />

      <div className={list()}>
        <p>خوش آمدی!</p>
      </div>

      <BottomTabs />
    </div>
  )
}
