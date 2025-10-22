import { Expose } from "class-transformer"

export class LessonResDto {
  @Expose()
  id!: number

  @Expose()
  title!: string
}
