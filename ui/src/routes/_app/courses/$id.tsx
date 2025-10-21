import { coursesControllerFindOneByIdV1Options } from "#/api-client"
import { AppBar } from "#/components/app-bar"
import { ErrorParagraph } from "#/components/error-paragraph"
import { FabMenu, type FabItem } from "#/components/fab-menu"
import { GoBackInHistoryBtn } from "#/components/go-back-in-history-btn"
import { Can } from "#/features/auth"
import { list, phonePage } from "#/shared/skins"
import { PenIcon, TrashIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

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

const items: FabItem[] = [
  {
    key: "delete",
    label: "حذف دوره",
    theme: "secondary-danger",
    icon: TrashIcon,
    onClick: () => console.log("Delete clicked"),
    closeAfterClick: true,
  },
  {
    key: "edit",
    label: "ویرایش دوره",
    theme: "secondary-brand",
    icon: PenIcon,
    onClick: () => console.log("Edit clicked"),
    closeAfterClick: true,
  },
]

function RouteComponent() {
  const [isOpen, setOpen] = useState(false)
  const { id } = Route.useParams()
  const { data, isError, refetch } = useQuery(
    coursesControllerFindOneByIdV1Options({ path: { id } }),
  )

  return (
    <div className={phonePage({ className: "relative" })}>
      <AppBar
        title={data ? data.title : "skeleton"}
        slotStart={<GoBackInHistoryBtn />}
      />

      <div className={list()}>
        {isError && <ErrorParagraph onClick={() => void refetch()} />}
      </div>

      <Can I="MANAGE" a="COURSE">
        <FabMenu
          isOpen={isOpen}
          onClick={() => setOpen(p => !p)}
          items={items}
        />
      </Can>
    </div>
  )
}
