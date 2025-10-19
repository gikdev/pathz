import { Module } from "@nestjs/common"
import { CurriculumStepsService } from "./curriculum-steps.service"
import { CurriculumStepsController } from "./curriculum-steps.controller"

@Module({
  controllers: [CurriculumStepsController],
  providers: [CurriculumStepsService],
})
export class CurriculumStepsModule {}
