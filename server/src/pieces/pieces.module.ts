import { Module } from "@nestjs/common"
import { PiecesController } from "./pieces.controller"
import { PiecesService } from "./pieces.service"
import { Piece } from "./piece.entity"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [TypeOrmModule.forFeature([Piece])],
  controllers: [PiecesController],
  providers: [PiecesService],
})
export class PiecesModule {}
