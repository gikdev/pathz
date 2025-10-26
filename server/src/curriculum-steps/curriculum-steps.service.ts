import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class CurriculumStepsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const steps = await this.prisma.curriculumStep.findMany()
    return { steps }
  }

  async findAllWithLessons() {
    const steps = await this.prisma.curriculumStep.findMany({
      orderBy: { position: "asc" },
      include: { lesson: true },
    })

    return { steps }
  }
}
