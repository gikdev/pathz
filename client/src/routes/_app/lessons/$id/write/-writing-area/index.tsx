import type { PieceWithStatusResDto } from "#/generated/api-client"
import { PieceRenderer } from "#/components/piece-renderer"
import * as PieceCard from "./piece-card"
import { useEffect, useEffectEvent } from "react"
import { useAppDispatch, useAppSelector } from "#/features/store"
import { writingAreaSlice } from "./store"
import { FabMenuWrapper } from "./fab-menu-wrapper"

const { moveDown, moveUp, remove, setPieces } = writingAreaSlice.actions

interface WritingAreaProps {
  initialPieces: PieceWithStatusResDto[]
}

export function WritingArea({ initialPieces }: WritingAreaProps) {
  const dispatch = useAppDispatch()
  const pieces = useAppSelector(s => s.writingArea.pieces)

  const piecesToShow = pieces.filter(p => p.status !== "Deleted")

  const setInitialPiecesEffectEvent = useEffectEvent(() => {
    dispatch(setPieces(initialPieces))
  })

  useEffect(() => {
    setInitialPiecesEffectEvent()
  }, [])

  return (
    <div className="flex flex-col gap-4 flex-1 overflow-y-auto relative">
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
        {piecesToShow.map(p => (
          <PieceCard.Core key={p.id}>
            <PieceRenderer payload={p.payload} type={p.type} />
            <PieceCard.ActionsBar
              position={p.position}
              onDownBtnClick={() => dispatch(moveDown(p.id))}
              onUpBtnClick={() => dispatch(moveUp(p.id))}
              onDeleteBtnClick={() => {
                if (!confirm("Sure?")) return
                dispatch(remove(p.id))
              }}
            />
          </PieceCard.Core>
        ))}
      </div>

      <FabMenuWrapper />
    </div>
  )
}
