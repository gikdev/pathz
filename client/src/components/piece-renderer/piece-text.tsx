import Markdown from "react-markdown"
import type { PieceTypeRenderer } from "./types"
import { z } from "zod"
import { ErrorBox } from "./error-box"

const PieceTextPayloadV1Schema = z.object({
  content: z.string(),
})

export const PieceText: PieceTypeRenderer = ({ payload }) => {
  if (!payload) return <ErrorBox message="Missing payload!" />

  try {
    const parsed = JSON.parse(payload) as unknown
    const { content } = PieceTextPayloadV1Schema.parse(parsed)

    return <Markdown children={content.trim().length ? content : "(خالی)"} />
  } catch (err) {
    console.error("PieceText error:", err)
    return <ErrorBox message="Failed in (parsing JSON OR schema validation)" />
  }
}
