import { Module } from "@nestjs/common"
import { PrismaModule } from "./prisma/prisma.module"
import { CoursesModule } from "./courses/courses.module"
import { CurriculumStepsModule } from "./curriculum-steps/curriculum-steps.module"

@Module({
  imports: [PrismaModule, CoursesModule, CurriculumStepsModule],
})
export class AppModule {}
