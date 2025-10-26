import { IsNotEmpty, IsString } from "class-validator"

export class BaseLessonReqDto {
  @IsString()
  @IsNotEmpty()
  title!: string
}
