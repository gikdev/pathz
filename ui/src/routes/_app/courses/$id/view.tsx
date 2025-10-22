import {
  coursesControllerFindOneByIdV1Options,
  coursesControllerRemoveOneByIdV1Mutation,
} from "#/api-client"
import { AppBar } from "#/components/app-bar"
import { ErrorParagraph } from "#/components/error-paragraph"
import { FabMenu, type FabItem } from "#/components/fab-menu"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { Can } from "#/features/auth"
import { list, phonePage } from "#/shared/skins"
import { PenIcon, TrashIcon } from "@phosphor-icons/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import toast from "react-hot-toast"

export const Route = createFileRoute("/_app/courses/$id/view")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data, isError, refetch } = useQuery(
    coursesControllerFindOneByIdV1Options({ path: { id } }),
  )

  return (
    <div className={phonePage({ className: "relative" })}>
      <AppBar
        title={data ? data.title : "skeleton"}
        slotStart={<GoBackNavBtn onClick={n => n({ to: "/courses" })} />}
      />

      <div className={list()}>
        {isError && <ErrorParagraph onClick={() => void refetch()} />}
      </div>

      <FabMenuWrapper id={id} />
    </div>
  )
}

function FabMenuWrapper({ id }: { id: number }) {
  const navigate = useNavigate()
  const [isOpen, setOpen] = useState(false)
  const toggle = () => setOpen(p => !p)
  const { mutate: remove } = useMutation({
    ...coursesControllerRemoveOneByIdV1Mutation(),
    onSuccess: () => {
      toast.success("انجام شد!")
      navigate({ to: "/courses" })
    },
    onError: error => {
      toast.error(`یه مشکلی پیش اومد: ${JSON.stringify(error)}`)
    },
  })

  const items: FabItem[] = useMemo(
    () => [
      {
        key: "delete",
        label: "حذف دوره",
        theme: "secondary-danger",
        icon: TrashIcon,
        closeAfterClick: true,
        onClick: () => {
          if (!confirm("مطمئنی؟")) return
          remove({ path: { id } })
        },
      },
      {
        key: "edit",
        label: "ویرایش دوره",
        theme: "secondary-brand",
        icon: PenIcon,
        closeAfterClick: true,
        onClick: () => {
          navigate({ to: "/courses/$id/edit", params: { id } })
        },
      },
    ],
    [id, remove],
  )

  return (
    <Can I="MANAGE" a="COURSE">
      <FabMenu isOpen={isOpen} onClick={toggle} items={items} />
    </Can>
  )
}
