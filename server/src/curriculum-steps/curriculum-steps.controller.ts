import { Controller, Get, Version } from "@nestjs/common"
import { CurriculumStepsService } from "./curriculum-steps.service"
import { ApiSummary } from "src/common/decorators/api-summary.decorator"
import { plainToInstance } from "class-transformer"
import { getDefaultClassTransformOptions } from "src/common/utils"
import { ApiTags } from "@nestjs/swagger"
import { CurriculumStepWithLessonResDto } from "./dto/curriculum-step-with-lesson.res.dto"

@ApiTags("Curriculum Steps")
@Controller("curriculum-steps")
export class CurriculumStepsController {
  constructor(
    private readonly curriculumStepsService: CurriculumStepsService,
  ) {}

  @ApiSummary("Get all steps (w/ lessons)")
  @Version("1")
  @Get()
  async findAllWithLessons() {
    const { steps } = await this.curriculumStepsService.findAllWithLessons()

    return plainToInstance(
      CurriculumStepWithLessonResDto,
      steps,
      getDefaultClassTransformOptions(),
    )
  }
}
