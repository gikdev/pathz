import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Version,
} from "@nestjs/common"
import { CoursesService } from "./courses.service"
import { CreateCourseReqDto } from "./dtos/create-course.req.dto"
import { UpdateCourseReqDto } from "./dtos/update-course.req.dto"
import { ParamId } from "src/common/decorators/param-id.decorator"
import { plainToInstance } from "class-transformer"
import { DeletedResDto } from "src/common/dtos/deleted.res.dto"
import { getDefaultClassTransformOptions } from "src/common/utils"
import { CourseResDto } from "./dtos/course.res.dto"
import { ApiSummary } from "src/common/decorators/api-summary.decorator"

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiSummary("Create a course")
  @Version("1")
  @Post()
  async create(@Body() createCourseReqDto: CreateCourseReqDto) {
    const course = await this.coursesService.create(createCourseReqDto)

    return plainToInstance(
      CourseResDto,
      course,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiSummary("Get courses")
  @Version("1")
  @Get()
  async findAll() {
    const courses = await this.coursesService.findAll()

    return plainToInstance(
      CourseResDto,
      courses,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiSummary("Get a course")
  @Version("1")
  @Get(":id")
  async findOne(@ParamId() id: number) {
    const course = await this.coursesService.findOneByIdOrThrow(id)

    return plainToInstance(
      CourseResDto,
      course,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiSummary("Update a course")
  @Version("1")
  @Patch(":id")
  async update(
    @ParamId() id: number,
    @Body() updateCourseReqDto: UpdateCourseReqDto,
  ) {
    const course = await this.coursesService.updateOneById(
      id,
      updateCourseReqDto,
    )

    return plainToInstance(
      CourseResDto,
      course,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiSummary("Delete a course")
  @Version("1")
  @Delete(":id")
  async remove(@ParamId() id: number) {
    const res = await this.coursesService.removeOneById(id)

    return plainToInstance(
      DeletedResDto,
      res,
      getDefaultClassTransformOptions(),
    )
  }
}
