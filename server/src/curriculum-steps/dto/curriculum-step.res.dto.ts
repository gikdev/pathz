import { Expose } from "class-transformer"

export class CurriculumStepResDto {
  @Expose()
  id!: number

  @Expose()
  position!: number
}
