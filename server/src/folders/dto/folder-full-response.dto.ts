import { Expose, Type } from "class-transformer"
import { PieceResponseDto } from "../../pieces/dto/piece-response.dto"
import { FolderBaseResponseDto } from "./folder-base-response.dto"

export class FolderFullResponseDto extends FolderBaseResponseDto {
  @Expose()
  @Type(() => FolderBaseResponseDto)
  subFolders: FolderBaseResponseDto[]

  @Expose()
  @Type(() => PieceResponseDto)
  pieces: PieceResponseDto[]
}
