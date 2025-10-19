import { Controller, Get, Version } from "@nestjs/common"
import { LessonsService } from "./lessons.service"
import { ApiSummary } from "src/common/decorators/api-summary.decorator"
import { plainToInstance } from "class-transformer"
import { getDefaultClassTransformOptions } from "src/common/utils"
import { OkResDto } from "src/common/dtos/ok.res.dto"

@Controller("lessons")
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiSummary("Lessons -> OK?")
  @Version("1")
  @Get("ok")
  async ok() {
    const ok = await this.lessonsService.ok()

    return plainToInstance(OkResDto, ok, getDefaultClassTransformOptions())
  }
}
