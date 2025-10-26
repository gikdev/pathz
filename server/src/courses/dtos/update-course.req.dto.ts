import { PartialType } from "@nestjs/swagger"
import { BaseCourseReqDto } from "./base-course.req.dto"

export class UpdateCourseReqDto extends PartialType(BaseCourseReqDto) {}
