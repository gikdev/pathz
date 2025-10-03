import { Expose, Type } from "class-transformer"
import { PieceResponseDto } from "src/pieces/dto/piece-response.dto"
import { FolderOnlyResponseDto } from "./folder-only-response.dto"

export class FolderWithRelationsResponseDto extends FolderOnlyResponseDto {
  @Expose()
  @Type(() => FolderOnlyResponseDto)
  subFolders: FolderOnlyResponseDto[]

  @Expose()
  @Type(() => PieceResponseDto)
  pieces: PieceResponseDto[]
}
