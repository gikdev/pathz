import { Module } from "@nestjs/common"
import { PrismaModule } from "./prisma/prisma.module"
import { CoursesModule } from "./courses/courses.module"
import { CurriculumStepsModule } from "./curriculum-steps/curriculum-steps.module"
import { LessonsModule } from "./lessons/lessons.module"

@Module({
  imports: [PrismaModule, CoursesModule, CurriculumStepsModule, LessonsModule],
})
export class AppModule {}
