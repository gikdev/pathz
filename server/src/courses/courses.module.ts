import { Module } from "@nestjs/common"
import { CoursesService } from "./courses.service"
import { CoursesController } from "./courses.controller"
import { LessonsModule } from "src/lessons/lessons.module"

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [LessonsModule],
})
export class CoursesModule {}
