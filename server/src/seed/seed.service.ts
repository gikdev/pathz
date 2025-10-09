import { Injectable } from "@nestjs/common"
import { FoldersService } from "../folders/folders.service"
import { PieceType } from "../pieces/piece-type.enum"
import { PiecesService } from "../pieces/pieces.service"

@Injectable()
export class SeedService {
  constructor(
    private readonly foldersService: FoldersService,
    private readonly piecesService: PiecesService,
  ) {}

  async run() {
    // Single folder
    const singleFolder = await this.foldersService.create({
      title: "پوشه تنها",
    })

    // Folder with subs
    const folderWithSubs = await this.foldersService.create({
      title: "پوشه با زیر پوشه",
    })
    const subFolder1 = await this.foldersService.create({
      title: "زیرپوشه ۱",
      parentFolderIds: [folderWithSubs.id],
    })

    // Folder with pieces
    const folderWithPieces = await this.foldersService.create({
      title: "پوشه تکه‌دار",
    })
    const piece1 = await this.piecesService.create({
      payload: { content: "***به نام خداوند بخشنده و مهربان***" },
      type: PieceType.TEXT,
      folderId: folderWithPieces.id,
    })
    const piece3 = await this.piecesService.create({
      payload: { content: "هلو بپر تو گلو!" },
      type: PieceType.TEXT,
      folderId: folderWithPieces.id,
    })

    // Folder with subs & pieces
    const folderWithSubsAndPieces = await this.foldersService.create({
      title: "پوشه با ریزپوشه و تکه",
    })
    const subFolder2 = await this.foldersService.create({
      title: "زیر پوشه ۲",
      parentFolderIds: [folderWithSubsAndPieces.id],
    })
    const piece2 = await this.piecesService.create({
      payload: { content: "سلام به **همگی**!" },
      type: PieceType.TEXT,
      folderId: folderWithSubsAndPieces.id,
    })
  }
}
