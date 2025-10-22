import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateLessonReqDto } from "./dtos/create-lesson.req.dto"

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  async ok() {
    await this.prisma.lesson.count()
    return { ok: true }
  }

  async createOne(courseId: number, createLessonReqDto: CreateLessonReqDto) {
    const lesson = await this.prisma.lesson.create({
      data: {
        courseId,
        title: createLessonReqDto.title,
      },
    })

    return { lesson }
  }
}
