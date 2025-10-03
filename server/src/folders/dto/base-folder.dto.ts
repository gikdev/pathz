import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from "class-validator"
import { FolderType } from "../folder-type.enum"

export class BaseFolderDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string

  @IsEnum(FolderType)
  @IsOptional()
  type?: FolderType

  @IsNumber()
  @Min(0)
  position?: number
}
