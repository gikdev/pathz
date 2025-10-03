import { Expose } from "class-transformer"
import { PieceType } from "../piece-type.enum"

export class PieceResponseDto {
  @Expose()
  id: number

  @Expose()
  position: number

  @Expose()
  type: PieceType

  @Expose()
  payload: Record<string, any>

  @Expose()
  folderId: number
}
