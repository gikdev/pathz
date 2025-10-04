import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  IsArray,
} from "class-validator"
import { FolderType } from "../enum/folder-type.enum"

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
  @IsOptional()
  @Min(0)
  position?: number

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  parentFolderIds?: number[]
}
