import { Expose, Type } from "class-transformer"
import { LessonResDto } from "src/lessons/dtos/lesson.res.dto"
import { CourseResDto } from "./course.res.dto"

export class CourseWithLessonsResDto extends CourseResDto {
  @Expose()
  @Type(() => LessonResDto)
  lessons!: LessonResDto[]
}
