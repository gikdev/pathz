import type { PieceWithStatusResDto } from "#/generated/api-client"
import { PieceRenderer } from "#/components/piece-renderer"
import * as PieceCard from "./piece-card"
import { usePieces } from "./store"
import { FabMenu, type FabItem } from "#/components/fab-menu"
import { Can } from "#/features/auth"
import { TextAaIcon } from "@phosphor-icons/react"
import { useMemo, useState } from "react"

interface WritingAreaProps {
  initialPieces: PieceWithStatusResDto[]
}

export function WritingArea({ initialPieces }: WritingAreaProps) {
  const { pieces, addText, moveDown, moveUp, remove } = usePieces(initialPieces)

  const piecesToShow = pieces.filter(p => p.status !== "Deleted")

  return (
    <div className="flex flex-col gap-4 flex-1 overflow-y-auto relative">
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
        {piecesToShow.map(p => (
          <PieceCard.Core key={p.id}>
            <PieceRenderer payload={p.payload} type={p.type} />
            <PieceCard.ActionsBar
              position={p.position}
              onDeleteBtnClick={() => (confirm("Sure?") ? remove(p.id) : null)}
              onDownBtnClick={() => moveDown(p.id)}
              onUpBtnClick={() => moveUp(p.id)}
            />
          </PieceCard.Core>
        ))}
      </div>

      <FabMenuWrapper addText={addText} />
    </div>
  )
}

function FabMenuWrapper({ addText }: { addText: (content: string) => void }) {
  const [isOpen, setOpen] = useState(false)
  const toggle = () => setOpen(p => !p)

  const items: FabItem[] = useMemo(
    () => [
      {
        key: "new-text",
        label: "متن جدید",
        theme: "secondary-success",
        icon: TextAaIcon,
        closeAfterClick: true,
        onClick: () => {
          const content = prompt("Content:")
          if (!content) return
          addText(content)
        },
      },
    ],
    [],
  )

  return (
    <Can I="MANAGE" a="COURSE">
      <FabMenu isOpen={isOpen} onClick={toggle} items={items} />
    </Can>
  )
}
