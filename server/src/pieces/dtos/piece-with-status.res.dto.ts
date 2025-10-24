import { Expose } from "class-transformer"
import { PieceResDto } from "./piece.res.dto"
import { PieceStatus } from "src/pieces/enums/piece-status.enum"

export class PieceWithStatusResDto extends PieceResDto {
  @Expose()
  status!: PieceStatus
}
