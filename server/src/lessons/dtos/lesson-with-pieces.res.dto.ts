import { Expose, Type } from "class-transformer"
import { LessonResDto } from "./lesson.res.dto"
import { PieceResDto } from "src/pieces/dtos/piece.res.dto"

export class LessonWithPiecesResDto extends LessonResDto {
  @Expose()
  @Type(() => PieceResDto)
  pieces!: PieceResDto[]
}
