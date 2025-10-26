import { Expose, Type } from "class-transformer"
import { PieceWithStatusResDto } from "src/pieces/dtos/piece-with-status.res.dto"

export class LessonContentResDto {
  @Expose()
  @Type(() => PieceWithStatusResDto)
  content!: PieceWithStatusResDto[]
}
