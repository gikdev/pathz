import {
  Controller,
  Get,
  HttpRedirectResponse,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Redirect,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger"
import type { Express } from "express"
import { UploadsService } from "./uploads.service"
import { memoryStorage } from "multer"
import { plainToInstance } from "class-transformer"
import { UploadResponseDto } from "./upload-response.dto"

@Controller("uploads")
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @ApiOperation({ summary: "Upload a file to server" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary", // 👈 makes it show a file picker
        },
      },
    },
  })
  @Post("file")
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.uploadsService.uploadFile(file)

    return plainToInstance(UploadResponseDto, result, {
      excludeExtraneousValues: true,
    })
  }

  @Get(":id/url")
  @Redirect("/", 302)
  async redirectToFile(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<HttpRedirectResponse> {
    const url = await this.uploadsService.getFileDownloadUrl(id)

    return {
      url,
      statusCode: HttpStatus.FOUND,
    }
  }
}
