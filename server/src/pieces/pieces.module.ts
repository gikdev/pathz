import { Module } from "@nestjs/common"
import { PiecesController } from "./pieces.controller"
import { PiecesService } from "./pieces.service"
import { Piece } from "./piece.entity"
import { TypeOrmModule } from "@nestjs/typeorm"
import { FoldersModule } from "../folders/folders.module"

@Module({
  imports: [TypeOrmModule.forFeature([Piece]), FoldersModule],
  controllers: [PiecesController],
  providers: [PiecesService],
  exports: [PiecesService],
})
export class PiecesModule {}
