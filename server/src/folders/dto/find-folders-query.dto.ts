import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from "class-validator"
import { FindFolderMode } from "../enum/find-folder-mode.enum"
import { FolderType } from "../enum/folder-type.enum"
import { Transform } from "class-transformer"
import { SortOrder } from "../enum/sort-order.enum"
import { SortFolderBy } from "../enum/sort-folder-by.enum"

export class FindFoldersQueryDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  search?: string

  @IsOptional()
  @IsEnum(FindFolderMode)
  mode?: FindFolderMode

  @IsOptional()
  @IsEnum(FolderType)
  type?: FolderType

  // @IsOptional()
  // @IsNumber()
  // @Transform(p => Number(p.value))
  // @Min(1)
  // page: number = 1

  // @IsOptional()
  // @IsNumber()
  // @Transform(p => Number(p.value))
  // @Min(1)
  // per_page: number = 15

  @IsOptional()
  @IsEnum(SortFolderBy)
  sort_by: SortFolderBy = SortFolderBy.POSITION

  @IsOptional()
  @IsEnum(SortOrder)
  order: SortOrder = SortOrder.ASC
}
