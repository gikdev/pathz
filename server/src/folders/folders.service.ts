import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Folder } from "./folder.entity"
import { Repository } from "typeorm"
import { CreateFolderDto } from "./dto/create-folder.dto"

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly foldersRepo: Repository<Folder>,
  ) {}

  async getAll() {
    const folders = await this.foldersRepo.find()

    return folders
  }

  async create(createFolderDto: CreateFolderDto) {
    const folder = this.foldersRepo.create(createFolderDto)

    await this.foldersRepo.save(folder)

    return folder
  }

  async remove(id: number) {
    const result = await this.foldersRepo.delete({ id })

    if (result.affected === 0)
      throw new NotFoundException(`Folder with ID ${id} was not found.`)
  }
}
