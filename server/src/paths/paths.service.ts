import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreatePathReqDto } from "./dtos/create-path.req.dto"
import { UpdatePathReqDto } from "./dtos/update-path.req.dto"

@Injectable()
export class PathsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const paths = await this.prisma.path.findMany()
    return paths
  }

  async findOneByIdOrThrow(id: number) {
    const path = await this.prisma.path.findUnique({ where: { id } })
    if (!path) throw new NotFoundException(`Path #${id} wasn't found!`)
    return path
  }

  async createOne(createPathReqDto: CreatePathReqDto) {
    const path = await this.prisma.path.create({ data: createPathReqDto })
    return path
  }

  async updateOneById(id: number, updatePathReqDto: UpdatePathReqDto) {
    const path = await this.prisma.path.update({
      where: { id },
      data: updatePathReqDto,
    })

    return path
  }

  async removeOneById(id: number) {
    await this.prisma.path.delete({ where: { id } })

    return { id }
  }
}
