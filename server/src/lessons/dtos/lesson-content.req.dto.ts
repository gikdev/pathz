import { Type } from "class-transformer"
import { IsArray, ValidateNested } from "class-validator"
import { PieceModificationReqDto } from "src/pieces/dtos/piece-modification.req.dto"

export class LessonContentReqDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PieceModificationReqDto)
  content!: PieceModificationReqDto[]
}
