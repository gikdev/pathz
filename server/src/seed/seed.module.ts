import { Module } from "@nestjs/common"
import { SeedService } from "./seed.service"
import { PiecesModule } from "src/pieces/pieces.module"
import { FoldersModule } from "src/folders/folders.module"
import { SeedController } from "./seed.controller"

@Module({
  imports: [PiecesModule, FoldersModule],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
