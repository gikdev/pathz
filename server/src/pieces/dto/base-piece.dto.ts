import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  Min,
} from "class-validator"
import { PieceType } from "../piece-type.enum"

export class BasePieceDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  position?: number

  @IsEnum(PieceType)
  @IsNotEmpty()
  type: PieceType

  @IsObject()
  payload: Record<string, any>

  @IsNumber()
  folderId: number
}
