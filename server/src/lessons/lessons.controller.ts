import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Version,
} from "@nestjs/common"
import { LessonsService } from "./lessons.service"
import { ApiSummary } from "src/common/decorators/api-summary.decorator"
import { plainToInstance } from "class-transformer"
import { getDefaultClassTransformOptions } from "src/common/utils"
import { OkResDto } from "src/common/dtos/ok.res.dto"
import { ParamId } from "src/common/decorators/param-id.decorator"
import { LessonWithPiecesResDto } from "./dtos/lesson-with-pieces.res.dto"
import { DeletedResDto } from "src/common/dtos/deleted.res.dto"
import { UpdateLessonReqDto } from "./dtos/update-lesson.req.dto"
import { LessonResDto } from "./dtos/lesson.res.dto"
import { LessonContentResDto } from "./dtos/lesson-content.res.dto"

@Controller("lessons")
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiSummary("Lessons -> OK?")
  @Version("1")
  @Get("ok")
  async ok() {
    const ok = await this.lessonsService.ok()

    return plainToInstance(OkResDto, ok, getDefaultClassTransformOptions())
  }

  @ApiSummary("Get a lesson (w/ pieces)")
  @Version("1")
  @Get(":id")
  async findOneByIdWithPieces(@ParamId() id: number) {
    const { lessonWithPieces } =
      await this.lessonsService.findOneByIdWithPieces(id)

    if (!lessonWithPieces)
      throw new NotFoundException(`Lesson #${id} was not found!`)

    return plainToInstance(
      LessonWithPiecesResDto,
      lessonWithPieces,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiSummary("Update a lesson")
  @Version("1")
  @Patch(":id")
  async updateOneById(
    @ParamId() id: number,
    @Body() updateLessonReqDto: UpdateLessonReqDto,
  ) {
    const { lesson } = await this.lessonsService.updateOneById(
      id,
      updateLessonReqDto,
    )

    return plainToInstance(
      LessonResDto,
      lesson,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiSummary("Delete a lesson")
  @Version("1")
  @Delete(":id")
  async removeOneById(@ParamId() id: number) {
    const res = await this.lessonsService.removeOneById(id)

    return plainToInstance(
      DeletedResDto,
      res,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiSummary("Get a lesson's content")
  @Version("1")
  @Get(":id/content")
  async getContentOfOneById(@ParamId() id: number) {
    const { content } = await this.lessonsService.getContentOfOneById(id)

    return plainToInstance(
      LessonContentResDto,
      { content },
      getDefaultClassTransformOptions(),
    )
  }

  // @ApiSummary("Update a lesson's content")
  // @Version("1")
  // @Put(":id/content")
  // async updateContentOfOneById(
  //   @ParamId() id: number,
  //   @Body() lessonContentReqDto: LessonContentReqDto,
  // ) {}
}
