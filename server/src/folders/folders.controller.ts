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
} from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"
import { FoldersService } from "./folders.service"
import { plainToInstance } from "class-transformer"
import { FolderFullResponseDto } from "./dto/folder-full-response.dto"
import { CreateFolderDto } from "./dto/create-folder.dto"

@Controller("folders")
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @ApiOperation({ summary: "Get all (parent) folders" })
  @Get()
  async getAll() {
    const folders = await this.foldersService.getAllParents()

    return plainToInstance(FolderFullResponseDto, folders, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Get folder by ID" })
  @Get(":id")
  async getById(@Param("id", ParseIntPipe) id: number) {
    const folder = await this.foldersService.findOneById(id)

    return plainToInstance(FolderFullResponseDto, folder, {
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
