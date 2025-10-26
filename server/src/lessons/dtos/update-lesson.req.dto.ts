import { PartialType } from "@nestjs/swagger"
import { BaseLessonReqDto } from "./base-lesson.req.dto"

export class UpdateLessonReqDto extends PartialType(BaseLessonReqDto) {}
