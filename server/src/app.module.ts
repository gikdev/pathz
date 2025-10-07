import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { join } from "node:path"
import { FoldersModule } from "./folders/folders.module"
import { PiecesModule } from "./pieces/pieces.module"
import { SeedModule } from "./seed/seed.module"
import { UploadsModule } from "./uploads/uploads.module"
import { ConfigModule } from "@nestjs/config"

const typeorm = TypeOrmModule.forRoot({
  type: "sqlite",
  database: join(__dirname, "..", "db.db"),
  autoLoadEntities: true,
  synchronize: true,
})

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    typeorm,
    FoldersModule,
    PiecesModule,
    SeedModule,
    UploadsModule,
  ],
})
export class AppModule {}
