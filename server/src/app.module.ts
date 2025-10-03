import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { join } from "node:path"
import { FoldersModule } from "./folders/folders.module"
import { PiecesModule } from "./pieces/pieces.module"
import { SeedModule } from "./seed/seed.module"

const typeorm = TypeOrmModule.forRoot({
  type: "sqlite",
  database: join(__dirname, "..", "db.db"),
  autoLoadEntities: true,
  synchronize: true,
})

@Module({
  imports: [typeorm, FoldersModule, PiecesModule, SeedModule],
})
export class AppModule {}
