import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateLessonReqDto } from "./dtos/create-lesson.req.dto"
import { UpdateLessonReqDto } from "./dtos/update-lesson.req.dto"
import { PieceStatus } from "../pieces/enums/piece-status.enum"
import { LessonContentReqDto } from "./dtos/lesson-content.req.dto"

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  async ok() {
    await this.prisma.lesson.count()
    return { ok: true }
  }

  async findOneById(id: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
    })

    return { lesson }
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

  async getContentOfOneById(id: number) {
    const pieces = await this.prisma.piece.findMany({
      where: { lessonId: id },
      orderBy: { position: "asc" },
    })

    const content = pieces.map(p => ({ ...p, status: PieceStatus.Untouched }))

    return { content }
  }

  async updateContentOfOneById(
    id: number,
    lessonContentReqDto: LessonContentReqDto,
  ) {
    const exists = (await this.findOneById(id)) === null
    
    if (!exists) throw new NotFoundException("Lesson was not found")

    for (const pieceModificationReqDto of lessonContentReqDto.content) {
      const sth = await this.prisma.piece.create({
        data: {
          id: pieceModificationReqDto.id,
          lessonId: id,
          position: pieceModificationReqDto.position,
          type: pieceModificationReqDto.type,
          payload: pieceModificationReqDto.payload,
        }
      })

      console.log(sth);
    }
  }
}
