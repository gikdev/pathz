import { Expose } from "class-transformer"

export class CourseResDto {
  @Expose()
  id!: number

  @Expose()
  title!: string

  @Expose()
  description!: string | null
}
