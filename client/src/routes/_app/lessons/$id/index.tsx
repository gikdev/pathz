import {
  lessonsControllerFindOneByIdWithPiecesV1Options,
  lessonsControllerRemoveOneByIdV1Mutation,
} from "#/generated/api-client"
import { AppBar } from "#/components/app-bar"
import { ErrorParagraph } from "#/components/error-paragraph"
import { FabMenu, type FabItem } from "#/components/fab-menu"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { Can } from "#/features/auth"
import { list, phonePage } from "#/shared/skins"
import { PenIcon, TrashIcon } from "@phosphor-icons/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import toast from "react-hot-toast"

export const Route = createFileRoute("/_app/lessons/$id/")({
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
    data: lesson,
    isSuccess,
    isError,
    refetch,
  } = useQuery(
    lessonsControllerFindOneByIdWithPiecesV1Options({ path: { id } }),
  )

  return (
    <div className={phonePage({ className: "relative" })}>
      <AppBar
        title={lesson ? lesson.title : "skeleton"}
        slotStart={<GoBackNavBtn onClick={nav => nav({ to: "/" })} />}
      />

      <div className={list()}>
        {isError && <ErrorParagraph onClick={refetch} />}
        {isSuccess && (
          <pre>
            <code>{JSON.stringify(lesson.pieces, null, 2)}</code>
          </pre>
        )}
      </div>

      <FabMenuWrapper id={id} />
    </div>
  )
}

function FabMenuWrapper({ id }: { id: number }) {
  const navigate = useNavigate()
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)
  const toggle = () => setOpen(p => !p)
  const { mutate: remove } = useMutation({
    ...lessonsControllerRemoveOneByIdV1Mutation(),
    onSuccess: () => {
      toast.success("انجام شد!")
      router.history.back()
    },
    onError: error => {
      toast.error(`یه مشکلی پیش اومد: ${JSON.stringify(error)}`)
    },
  })

  const items: FabItem[] = useMemo(
    () => [
      {
        key: "delete",
        label: "حذف درس",
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
        label: "ویرایش درس",
        theme: "secondary-brand",
        icon: PenIcon,
        closeAfterClick: true,
        onClick: () => {
          navigate({ to: "/lessons/$id/edit", params: { id } })
        },
      },
      {
        key: "write",
        label: "نوشتن",
        theme: "secondary-brand",
        icon: PenIcon,
        closeAfterClick: true,
        onClick: () => {
          navigate({ to: "/lessons/$id/write", params: { id } })
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
