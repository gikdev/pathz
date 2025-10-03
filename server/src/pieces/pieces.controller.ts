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
import { PiecesService } from "./pieces.service"
import { ApiOperation } from "@nestjs/swagger"
import { PieceResponseDto } from "./dto/piece-response.dto"
import { plainToInstance } from "class-transformer"
import { CreatePieceDto } from "./dto/create-piece.dto"

@Controller("pieces")
export class PiecesController {
  constructor(private readonly piecesService: PiecesService) {}

  @ApiOperation({ summary: "Get all pieces" })
  @Get()
  async getAll() {
    const pieces = await this.piecesService.getAll()

    return plainToInstance(PieceResponseDto, pieces, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Create a piece" })
  @Post()
  async create(@Body() createPieceDto: CreatePieceDto) {
    const piece = await this.piecesService.create(createPieceDto)

    return plainToInstance(PieceResponseDto, piece, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Delete a piece" })
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", ParseIntPipe) id: number) {
    await this.piecesService.remove(id)
  }
}
