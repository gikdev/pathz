import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  async ok() {
    await this.prisma.lesson.count()
    return { ok: true }
  }
}
