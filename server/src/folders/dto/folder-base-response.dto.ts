import { Expose } from "class-transformer"
import { FolderType } from "../enum/folder-type.enum"

export class FolderBaseResponseDto {
  @Expose()
  id: number

  @Expose()
  title: string

  @Expose()
  description: string | null

  @Expose()
  type: FolderType | null

  @Expose()
  position: number
}
