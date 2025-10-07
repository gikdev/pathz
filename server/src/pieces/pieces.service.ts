import { Injectable, NotFoundException } from "@nestjs/common"
import { CreatePieceDto } from "./dto/create-piece.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { Piece } from "./piece.entity"
import { Repository } from "typeorm"
import { FoldersService } from "../folders/folders.service"

@Injectable()
export class PiecesService {
  constructor(
    @InjectRepository(Piece)
    private readonly piecesRepo: Repository<Piece>,
    private readonly foldersService: FoldersService,
  ) {}

  async getAll() {
    const pieces = await this.piecesRepo.find({
      loadRelationIds: true,
    })

    return pieces
  }

  async create(createPieceDto: CreatePieceDto) {
    const piece = this.piecesRepo.create(createPieceDto)

    const folder = await this.foldersService.findOneById(
      createPieceDto.folderId,
    )

    piece.folder = folder

    await this.piecesRepo.save(piece)

    return piece
  }

  async remove(id: number) {
    const result = await this.piecesRepo.delete({ id })

    if (result.affected === 0)
      throw new NotFoundException(`Piece with ID ${id} was not found.`)
  }
}
