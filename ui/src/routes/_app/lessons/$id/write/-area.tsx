import { type PieceWithStatusResDto } from "#/api-client"
import { btn, iconBtn } from "#/shared/skins"
import { useReducer } from "react"
import { produce } from "immer"
import { input } from "#/features/forms/skins"
import { PieceRenderer } from "#/components/piece-renderer"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PencilSimpleIcon,
  TrashSimpleIcon,
} from "@phosphor-icons/react"

interface WritingAreaProps {
  initialPieces: PieceWithStatusResDto[]
}

export function WritingArea({ initialPieces }: WritingAreaProps) {
  const { pieces, addText, moveDown, moveUp } = usePieces(initialPieces)

  return (
    <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
      <div className="flex gap-2">
        <input className={input()} onBlur={e => addText(e.target.value)} />
        <button className={btn()}>جدید</button>
      </div>

      <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
        {pieces.map(p => (
          <div
            className="flex flex-col group rounded-lg border border-gray-300/20 hover:border-gray-300 p-2 gap-2"
            key={p.id}
            dir="auto"
          >
            <PieceRenderer payload={p.payload} type={p.type} />

            <div
              className="opacity-20 group-hover:opacity-100 flex gap-1 items-center justify-end transition-all"
              dir="rtl"
            >
              <button
                className={iconBtn({ size: 8 })}
                onClick={() => moveDown(p.id)}
              >
                <ArrowDownIcon />
              </button>

              <button className={iconBtn({ size: 8 })} disabled>
                {p.position}
              </button>

              <button
                className={iconBtn({ size: 8 })}
                onClick={() => moveUp(p.id)}
              >
                <ArrowUpIcon />
              </button>

              <button className={iconBtn({ size: 8 })} disabled>
                <PencilSimpleIcon />
              </button>

              <button className={iconBtn({ size: 8 })} disabled>
                <TrashSimpleIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// type PieceType = PieceWithStatusResDto["type"]
// type PieceStatus = PieceWithStatusResDto["status"]

type ActionAddText = {
  type: "ADD_TEXT"
  payload: {
    content: string
  }
}

type ActionMoveUp = {
  type: "MOVE_UP"
  payload: {
    id: number
  }
}

type ActionMoveDown = {
  type: "MOVE_DOWN"
  payload: {
    id: number
  }
}

type Action = ActionAddText | ActionMoveDown | ActionMoveUp

type State = PieceWithStatusResDto[]

const reducer = (state: State, action: Action): State =>
  produce(state, pieces => {
    if (action.type === "ADD_TEXT") {
      pieces.push({
        id: pieces.length,
        payload: JSON.stringify({ content: action.payload.content }),
        position: pieces.length + 1,
        status: "Created",
        type: "Text",
      })

      return
    }

    if (action.type === "MOVE_DOWN") {
      const currentIndex = pieces.findIndex(p => p.id === action.payload.id)
      const nextIndex = currentIndex + 1

      // Check if the current piece exists in the array
      const pieceExists = currentIndex >= 0
      // Check if there is a piece below to swap with
      const hasNextPiece = nextIndex < pieces.length

      if (pieceExists && hasNextPiece) {
        const currentPiece = pieces[currentIndex]
        const nextPiece = pieces[nextIndex]

        const tempPosition = nextPiece.position
        nextPiece.position = currentPiece.position
        currentPiece.position = tempPosition
      }
    }

    if (action.type === "MOVE_UP") {
      const currentIndex = pieces.findIndex(p => p.id === action.payload.id)
      const previousIndex = currentIndex - 1

      // Check if the current piece exists
      const pieceExists = currentIndex >= 0
      // Check if there is a piece above to swap with
      const hasPreviousPiece = previousIndex >= 0

      if (pieceExists && hasPreviousPiece) {
        const currentPiece = pieces[currentIndex]
        const previousPiece = pieces[previousIndex]

        const tempPosition = previousPiece.position
        previousPiece.position = currentPiece.position
        currentPiece.position = tempPosition
      }
    }

    if (action.type === "MOVE_UP" || action.type === "MOVE_DOWN") {
      pieces.sort((a, b) => a.position - b.position)
    }
  })

function usePieces(initialPieces: PieceWithStatusResDto[] = []) {
  const [pieces, dispatch] = useReducer(reducer, initialPieces)

  const addText = (content: string) =>
    dispatch({ type: "ADD_TEXT", payload: { content } })

  const moveUp = (id: number) => dispatch({ type: "MOVE_UP", payload: { id } })
  const moveDown = (id: number) =>
    dispatch({ type: "MOVE_DOWN", payload: { id } })

  const returnee = { pieces, addText, moveUp, moveDown }

  return returnee
}
