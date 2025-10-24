import { Expose } from "class-transformer"
import { PieceType } from "src/pieces/enums/piece-type.enum"

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
