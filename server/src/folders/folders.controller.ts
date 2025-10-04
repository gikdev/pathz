import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"
import { FoldersService } from "./folders.service"
import { plainToInstance } from "class-transformer"
import { FolderFullResponseDto } from "./dto/folder-full-response.dto"
import { CreateFolderDto } from "./dto/create-folder.dto"
import { FindFoldersQueryDto } from "./dto/find-folders-query.dto"

@Controller("folders")
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @ApiOperation({ summary: "Get all folders" })
  @Get()
  async getAll(@Query() query: FindFoldersQueryDto) {
    const folders = await this.foldersService.getAll()

    console.log(query)

    return plainToInstance(FolderFullResponseDto, folders, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Create a folder" })
  @Post()
  async create(@Body() createFolderDto: CreateFolderDto) {
    const folder = await this.foldersService.create(createFolderDto)

    return plainToInstance(FolderFullResponseDto, folder, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Delete a folder" })
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", ParseIntPipe) id: number) {
    await this.foldersService.remove(id)
  }
}
