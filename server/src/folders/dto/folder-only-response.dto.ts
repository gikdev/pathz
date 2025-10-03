import { Expose } from "class-transformer"
import { FolderType } from "../folder-type.enum"

export class FolderOnlyResponseDto {
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
