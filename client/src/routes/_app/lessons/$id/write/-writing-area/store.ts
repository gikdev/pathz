import { type PieceWithStatusResDto } from "#/generated/api-client"
import { useReducer } from "react"
import { produce } from "immer"

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

type ActionDelete = {
  type: "DELETE"
  payload: {
    id: number
  }
}

type Action = ActionAddText | ActionMoveDown | ActionMoveUp | ActionDelete

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

        pieces.sort((a, b) => a.position - b.position)
      }

      return
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

        pieces.sort((a, b) => a.position - b.position)
      }

      return
    }

    if (action.type === "DELETE") {
      const idx = pieces.findIndex(p => p.id === action.payload.id)
      if (idx === -1) return // Not found — do nothing

      const piece = pieces[idx]

      if (piece.status === "Deleted") return

      if (piece.status === "Untouched") {
        piece.status = "Deleted"
      }

      if (piece.status === "Created") {
        pieces.splice(idx, 1)
      }

      if (piece.status === "Edited") {
        piece.status = "Deleted"
      }
    }
  })

export function usePieces(initialPieces: PieceWithStatusResDto[] = []) {
  const [pieces, dispatch] = useReducer(reducer, initialPieces)

  const addText = (content: string) =>
    dispatch({ type: "ADD_TEXT", payload: { content } })

  const moveUp = (id: number) => dispatch({ type: "MOVE_UP", payload: { id } })
  const moveDown = (id: number) =>
    dispatch({ type: "MOVE_DOWN", payload: { id } })

  const remove = (id: number) => dispatch({ type: "DELETE", payload: { id } })

  const returnee = { pieces, addText, moveUp, moveDown, remove }

  return returnee
}
