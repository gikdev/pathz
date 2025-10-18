import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Version,
} from "@nestjs/common"
import { PathsService } from "./paths.service"
import { plainToInstance } from "class-transformer"
import { getDefaultClassTransformOptions } from "src/common/utils"
import { PathResDto } from "./dtos/path.res.dto"
import { CreatePathReqDto } from "./dtos/create-path.req.dto"
import { ParamId } from "src/common/decorators/param-id.decorator"
import { UpdatePathReqDto } from "./dtos/update-path.req.dto"
import { DeletedResDto } from "src/common/dtos/deleted.res.dto"
import { ApiSummary } from "src/common/decorators/api-summary.decorator"

@Controller("paths")
export class PathsController {
  constructor(private readonly pathsService: PathsService) {}

  @ApiSummary("Create a path")
  @Version("1")
  @Post()
  async createOne(@Body() createPathReqDto: CreatePathReqDto) {
    const path = await this.pathsService.createOne(createPathReqDto)

    return plainToInstance(PathResDto, path, getDefaultClassTransformOptions())
  }

  @ApiSummary("Get paths")
  @Version("1")
  @Get()
  async findAll() {
    const paths = await this.pathsService.findAll()

    return plainToInstance(PathResDto, paths, getDefaultClassTransformOptions())
  }

  @ApiSummary("Get a path")
  @Version("1")
  @Get(":id")
  async findOneById(@ParamId() id: number) {
    const path = await this.pathsService.findOneByIdOrThrow(id)

    return plainToInstance(PathResDto, path, getDefaultClassTransformOptions())
  }

  @ApiSummary("Update a path")
  @Version("1")
  @Patch(":id")
  async updateOneById(
    @ParamId() id: number,
    @Body() updatePathReqDto: UpdatePathReqDto,
  ) {
    const path = await this.pathsService.updateOneById(id, updatePathReqDto)

    return plainToInstance(PathResDto, path, getDefaultClassTransformOptions())
  }

  @ApiSummary("Delete a path")
  @Version("1")
  @Delete(":id")
  async deleteOneById(@ParamId() id: number) {
    const res = await this.pathsService.removeOneById(id)

    return plainToInstance(
      DeletedResDto,
      res,
      getDefaultClassTransformOptions(),
    )
  }
}
