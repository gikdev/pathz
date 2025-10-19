import { IsNotEmpty, IsString } from "class-validator"
import { IsNullable } from "src/common/decorators/is-nullable.decorator"

export class BaseCourseReqDto {
  @IsString()
  @IsNotEmpty()
  title!: string

  @IsString()
  @IsNullable()
  description!: string | null
}
