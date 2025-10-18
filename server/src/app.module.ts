import { Module } from "@nestjs/common"
import { PrismaModule } from "./prisma/prisma.module"
import { PathsModule } from "./paths/paths.module"
import { CoursesModule } from "./courses/courses.module"

@Module({
  imports: [PrismaModule, PathsModule, CoursesModule],
})
export class AppModule {}
