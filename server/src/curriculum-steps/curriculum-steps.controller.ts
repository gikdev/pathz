import { Controller, Get, Version } from "@nestjs/common"
import { CurriculumStepsService } from "./curriculum-steps.service"
import { ApiSummary } from "src/common/decorators/api-summary.decorator"
import { plainToInstance } from "class-transformer"
import { CurriculumStepResDto } from "./dto/curriculum-step.res.dto"
import { getDefaultClassTransformOptions } from "src/common/utils"
import { ApiTags } from "@nestjs/swagger"

@ApiTags("Curriculum Steps")
@Controller("curriculum-steps")
export class CurriculumStepsController {
  constructor(
    private readonly curriculumStepsService: CurriculumStepsService,
  ) {}

  @ApiSummary("Get the curriculum steps")
  @Version("1")
  @Get()
  async findAll() {
    const steps = await this.curriculumStepsService.findAll()

    return plainToInstance(
      CurriculumStepResDto,
      steps,
      getDefaultClassTransformOptions(),
    )
  }
}
