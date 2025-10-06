import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import type {Express} from "express"
import { UploadsService } from './uploads.service';
import { memoryStorage } from 'multer';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService  
  ) {}

  @ApiOperation({ summary: "Upload a file to server" })
    @ApiConsumes('multipart/form-data') // 👈 tells Swagger this is a form upload
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // 👈 makes it show a file picker
        },
      },
    },
  })
  @Post("file")
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadsService.uploadFile(file)
  }
}
