import { Expose, Transform } from "class-transformer"
import { FileType } from "./file-type.enum"

export class UploadResponseDto {
  @Expose()
  id: number

  @Expose()
  fileId: string

  @Expose()
  type: FileType

  @Expose()
  extension: string

  @Expose()
  mime: string

  @Expose()
  size: number

  @Expose()
  @Transform(({ obj }) => {
    const mime = obj.mime as string

    if (mime.startsWith("image/")) return FileType.IMAGE
    if (mime.startsWith("video/")) return FileType.VIDEO
    if (mime.startsWith("audio/")) return FileType.AUDIO
    if (mime === "application/pdf") return FileType.PDF
    if (mime.includes("msword") || mime.includes("officedocument"))
      return FileType.DOCUMENT
    if (
      mime.includes("zip") ||
      mime.includes("rar") ||
      mime.includes("tar") ||
      mime.includes("7z")
    )
      return FileType.ARCHIVE

    return FileType.OTHER
  })
  fileType: FileType
}
