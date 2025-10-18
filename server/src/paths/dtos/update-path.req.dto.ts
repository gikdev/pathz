import { PartialType } from "@nestjs/swagger"
import { BasePathReqDto } from "./base-path.req.dto"

export class UpdatePathReqDto extends PartialType(BasePathReqDto) {}
