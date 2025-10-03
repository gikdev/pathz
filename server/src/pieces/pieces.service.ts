import { Injectable, NotFoundException } from "@nestjs/common"
import { CreatePieceDto } from "./dto/create-piece.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { Piece } from "./piece.entity"
import { Repository } from "typeorm"

@Injectable()
export class PiecesService {
  constructor(
    @InjectRepository(Piece)
    private readonly piecesRepo: Repository<Piece>,
  ) {}

  async getAll() {
    const pieces = await this.piecesRepo.find()

    return pieces
  }

  async create(createPieceDto: CreatePieceDto) {
    const piece = this.piecesRepo.create(createPieceDto)

    await this.piecesRepo.save(piece)

    return piece
  }

  async remove(id: number) {
    const result = await this.piecesRepo.delete({ id })

    if (result.affected === 0)
      throw new NotFoundException(`Piece with ID ${id} was not found.`)
  }
}
