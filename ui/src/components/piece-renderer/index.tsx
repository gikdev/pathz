import type { PieceWithStatusResDto } from "#/api-client"
import { PieceSeparator } from "./piece-separator"
import { PieceText } from "./piece-text"

type PieceType = PieceWithStatusResDto["type"]

interface PieceRendererProps {
  type: PieceType
  payload: string | null
}

export function PieceRenderer({ type, payload }: PieceRendererProps) {
  if (type === "Text") return <PieceText payload={payload} />

  if (type === "Separator") return <PieceSeparator />

  return <p>{type}</p>
}
