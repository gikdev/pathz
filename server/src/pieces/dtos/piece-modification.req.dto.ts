import { IsOptional, IsInt, IsEnum, IsString, MinLength } from "class-validator"
import { IsNullable } from "src/common/decorators/is-nullable.decorator"
import { PieceStatus } from "../enums/piece-status.enum"
import { PieceType } from "../enums/piece-type.enum"

export class PieceModificationReqDto {
  @IsOptional()
  @IsInt()
  id?: number

  @IsInt()
  position!: number

  @IsEnum(PieceType)
  type!: PieceType

  @IsNullable()
  @IsString()
  @MinLength(1)
  payload!: string | null

  @IsEnum(PieceStatus)
  status!: PieceStatus
}
