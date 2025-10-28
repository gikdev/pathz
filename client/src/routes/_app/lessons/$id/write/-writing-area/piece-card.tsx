import { iconBtn } from "#/shared/skins"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PencilSimpleIcon,
  TrashSimpleIcon,
} from "@phosphor-icons/react"
import type { ReactNode } from "react"

// EXAMPLE USAGE:
/*
<PieceCard.Core>
  <PieceRenderer payload={p.payload} type={p.type} />
  <PieceCard.ActionsBar position={p.position} />
</PieceCard.Core>
*/

interface CoreProps {
  children: ReactNode
}

export function Core({ children }: CoreProps) {
  return (
    <div
      className="flex flex-col group rounded-lg border border-gray-300/20 hover:border-gray-300 p-2 gap-2"
      dir="auto"
    >
      {children}
    </div>
  )
}

interface ActionsBarProps {
  position: number
  onDownBtnClick?: () => void
  onUpBtnClick?: () => void
  onEditBtnClick?: () => void
  onDeleteBtnClick?: () => void
}

export function ActionsBar({
  onDownBtnClick,
  onDeleteBtnClick,
  onEditBtnClick,
  onUpBtnClick,
  position,
}: ActionsBarProps) {
  return (
    <div
      className="opacity-20 group-hover:opacity-100 flex gap-1 items-center justify-end transition-all"
      dir="rtl"
    >
      <button
        className={iconBtn({ size: 8 })}
        onClick={onDownBtnClick}
        disabled={!onDownBtnClick}
      >
        <ArrowDownIcon />
      </button>

      <button className={iconBtn({ size: 8 })} disabled>
        {position}
      </button>

      <button
        className={iconBtn({ size: 8 })}
        onClick={onUpBtnClick}
        disabled={!onUpBtnClick}
      >
        <ArrowUpIcon />
      </button>

      <button
        className={iconBtn({ size: 8 })}
        onClick={onEditBtnClick}
        disabled={!onEditBtnClick}
      >
        <PencilSimpleIcon />
      </button>

      <button
        className={iconBtn({ size: 8 })}
        onClick={onDeleteBtnClick}
        disabled={!onDeleteBtnClick}
      >
        <TrashSimpleIcon />
      </button>
    </div>
  )
}
