import { Expose } from "class-transformer"
import { FileType } from "./file-type.enum"

export class UploadResponseDto {
  @Expose()
  id: number

  @Expose()
  fileId: string

  @Expose()
  type: FileType

  @Expose()
  extention: string

  @Expose()
  mime: string

  @Expose()
  size: number
}