import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateCourseReqDto } from "./dtos/create-course.req.dto"
import { UpdateCourseReqDto } from "./dtos/update-course.req.dto"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseReqDto: CreateCourseReqDto) {
    const course = await this.prisma.course.create({
      data: createCourseReqDto,
    })

    return course
  }

  async findAll() {
    const courses = await this.prisma.course.findMany()
    return courses
  }

  async findOneByIdOrThrow(id: number) {
    const course = await this.prisma.course.findUnique({ where: { id } })
    if (!course) throw new NotFoundException(`Course #${id} wasn't found!`)
    return course
  }

  async findOneByIdOrThrowWithLessons(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { lessons: true },
    })

    if (!course) throw new NotFoundException(`Course #${id} wasn't found!`)

    return course
  }

  async updateOneById(id: number, updateCourseReqDto: UpdateCourseReqDto) {
    const course = await this.prisma.course.update({
      where: { id },
      data: updateCourseReqDto,
    })

    return course
  }

  async removeOneById(id: number) {
    await this.prisma.course.delete({ where: { id } })

    return { id }
  }
}
