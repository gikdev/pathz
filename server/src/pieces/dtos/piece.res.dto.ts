import { Expose } from "class-transformer"
import { PieceType } from "generated/prisma"

export class PieceResDto {
  @Expose()
  id!: number

  @Expose()
  position!: number

  @Expose()
  type!: PieceType

  @Expose()
  payload!: string | null
}
