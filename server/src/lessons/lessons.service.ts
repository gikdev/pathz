import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateLessonReqDto } from "./dtos/create-lesson.req.dto"
import { UpdateLessonReqDto } from "./dtos/update-lesson.req.dto"

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  async ok() {
    await this.prisma.lesson.count()
    return { ok: true }
  }

  async findOneByIdWithPieces(id: number) {
    const lessonWithPieces = await this.prisma.lesson.findFirst({
      where: { id },
      include: {
        pieces: {
          orderBy: {
            position: "asc",
          },
        },
      },
    })

    return { lessonWithPieces }
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

  async updateOneById(id: number, updateLessonReqDto: UpdateLessonReqDto) {
    const lesson = await this.prisma.lesson.update({
      where: { id },
      data: {
        ...updateLessonReqDto,
      },
    })

    return { lesson }
  }

  async removeOneById(id: number) {
    await this.prisma.lesson.delete({
      where: { id },
    })

    return { id }
  }
}
