import { Expose } from "class-transformer"

export class PathResDto {
  @Expose()
  id: number

  @Expose()
  title: string
}
