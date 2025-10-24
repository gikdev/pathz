import {
  lessonsControllerGetContentOfOneByIdV1Options,
  type PieceWithStatusResDto,
} from "#/api-client"
import { AppBar } from "#/components/app-bar"
import { ErrorParagraph } from "#/components/error-paragraph"
import { GoBackNavBtn } from "#/components/go-back-nav-btn"
import { phonePage, list } from "#/shared/skins"
import { SpinnerGapIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useMemo, useReducer } from "react"

export const Route = createFileRoute("/_app/lessons/$id/write")({
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
  const { data, status, refetch } = useQuery(
    lessonsControllerGetContentOfOneByIdV1Options({ path: { id } }),
  )

  switch (status) {
    case "error":
      return <ErrorParagraph onClick={refetch} />

    case "pending":
      return <SpinnerGapIcon size={40} className="animate-spin" />

    case "success":
      return (
        <div className={phonePage({ className: "relative" })}>
          <AppBar
            title="نوشتن"
            slotStart={
              <GoBackNavBtn
                onClick={nav => nav({ to: "/lessons/$id", params: { id } })}
              />
            }
          />

          <div className={list()}>
            <Editor initialPieces={data.content} />
          </div>
        </div>
      )

    default:
      return "Switch default!"
  }
}

interface EditorProps {
  initialPieces: PieceWithStatusResDto[]
}

function Editor({ initialPieces }: EditorProps) {
  const { pieces } = usePieces(initialPieces)

  return (
    <div>
      {pieces.map(p => (
        <div key={p.id}>
          <p>Id: {p.id}</p>
          <p>Status: {p.status}</p>
          <p>Payload: {JSON.stringify(p.payload, null, 2)}</p>
          <p>Position: {p.position}</p>
          <p>Type: {p.type}</p>
        </div>
      ))}
    </div>
  )
}

type Action =
  | { type: "ADD" }
  | { type: "EDIT"; id: number }
  | { type: "DELETE"; id: number }

function reducer(state: PieceWithStatusResDto[], action: Action) {
  if (action.type === "ADD") {
    return state
  }

  if (action.type === "EDIT") {
    return state
  }

  if (action.type === "DELETE") {
    return state
  }

  return state
}

function usePieces(initialPieces: PieceWithStatusResDto[] = []) {
  const [pieces, _dispatch] = useReducer(reducer, initialPieces)
  // WHERE_I_LEFT_OFF

  const returnee = useMemo(() => ({ pieces }), [pieces])

  return returnee
}
