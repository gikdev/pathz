import { Expose, Type } from "class-transformer"
import { CurriculumStepResDto } from "./curriculum-step.res.dto"
import { LessonResDto } from "src/lessons/dtos/lesson.res.dto"

export class CurriculumStepWithLessonResDto extends CurriculumStepResDto {
  @Expose()
  @Type(() => LessonResDto)
  lesson!: LessonResDto
}
