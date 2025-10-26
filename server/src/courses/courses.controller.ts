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
import { LessonsService } from "src/lessons/lessons.service"
import { CreateLessonReqDto } from "src/lessons/dtos/create-lesson.req.dto"
import { LessonResDto } from "src/lessons/dtos/lesson.res.dto"
import { CourseWithLessonsResDto } from "./dtos/course-with-lessons.res.dto"

@Controller("courses")
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly lessonsService: LessonsService,
  ) {}

  @ApiSummary("Create a course")
  @Version("1")
  @Post()
  async createOne(@Body() createCourseReqDto: CreateCourseReqDto) {
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

  @ApiSummary("Get a course (w/ lessons)")
  @Version("1")
  @Get(":id")
  async findOneByIdWithLessons(@ParamId() id: number) {
    const course = await this.coursesService.findOneByIdOrThrowWithLessons(id)

    return plainToInstance(
      CourseWithLessonsResDto,
      course,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiSummary("Update a course")
  @Version("1")
  @Patch(":id")
  async updateOneById(
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
  async removeOneById(@ParamId() id: number) {
    const res = await this.coursesService.removeOneById(id)

    return plainToInstance(
      DeletedResDto,
      res,
      getDefaultClassTransformOptions(),
    )
  }

  @ApiSummary("Create lesson by course ID")
  @Version("1")
  @Post(":id/lesson")
  async createOneLessonByCourseId(
    @ParamId() id: number,
    @Body() createLessonReqDto: CreateLessonReqDto,
  ) {
    const { lesson } = await this.lessonsService.createOne(
      id,
      createLessonReqDto,
    )

    return plainToInstance(
      LessonResDto,
      lesson,
      getDefaultClassTransformOptions(),
    )
  }
}
