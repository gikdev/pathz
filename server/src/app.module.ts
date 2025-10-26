import { Module } from "@nestjs/common"
import { PrismaModule } from "./prisma/prisma.module"
import { CoursesModule } from "./courses/courses.module"
import { CurriculumStepsModule } from "./curriculum-steps/curriculum-steps.module"
import { LessonsModule } from "./lessons/lessons.module"
import { PiecesModule } from "./pieces/pieces.module"

@Module({
  imports: [
    PrismaModule,
    CoursesModule,
    CurriculumStepsModule,
    LessonsModule,
    PiecesModule,
  ],
})
export class AppModule {}
