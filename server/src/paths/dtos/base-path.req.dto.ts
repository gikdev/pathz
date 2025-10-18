import { IsString, IsNotEmpty } from "class-validator"

export class BasePathReqDto {
  @IsString()
  @IsNotEmpty()
  title: string
}
