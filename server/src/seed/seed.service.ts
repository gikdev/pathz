import { Injectable } from "@nestjs/common"
import { FoldersService } from "src/folders/folders.service"
import { PieceType } from "src/pieces/piece-type.enum"
import { PiecesService } from "src/pieces/pieces.service"

@Injectable()
export class SeedService {
  constructor(
    private readonly foldersService: FoldersService,
    private readonly piecesService: PiecesService,
  ) {}

  async run() {
    // Single folder
    const singleFolder = await this.foldersService.create({
      title: "Single folder",
    })

    // Folder with subs
    const folderWithSubs = await this.foldersService.create({
      title: "Folder with subs",
    })
    const subFolder1 = await this.foldersService.create({
      title: "Sub Folder 1",
      parentFolderIds: [folderWithSubs.id],
    })

    // Folder with pieces
    const folderWithPieces = await this.foldersService.create({
      title: "Folder with pieces",
    })
    const piece1 = await this.piecesService.create({
      payload: {},
      type: PieceType.TEXT,
      folderId: folderWithPieces.id,
    })

    // Folder with subs & pieces
    const folderWithSubsAndPieces = await this.foldersService.create({
      title: "Folder with subs & pieces",
    })
    const subFolder2 = await this.foldersService.create({
      title: "Sub Folder 2",
      parentFolderIds: [folderWithSubsAndPieces.id],
    })
    const piece2 = await this.piecesService.create({
      payload: {},
      type: PieceType.TEXT,
      folderId: folderWithSubsAndPieces.id,
    })
  }
}
