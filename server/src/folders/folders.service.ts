import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Folder } from "./folder.entity"
import { Repository, In, DataSource } from "typeorm"
import { CreateFolderDto } from "./dto/create-folder.dto"

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly foldersRepo: Repository<Folder>,

    private readonly dataSource: DataSource,
  ) {}

  async getAllRootFolders() {
    const rootFolders = await this.foldersRepo
      .createQueryBuilder("folder")
      .leftJoin("folder.parentFolders", "parent")
      .where("parent.id IS NULL")
      .getMany()

    return rootFolders
  }

  async findOneById(id: number) {
    const folder = await this.foldersRepo.findOne({
      where: { id },
      relations: {
        pieces: true,
        subFolders: true,
      },
    })

    if (!folder)
      throw new NotFoundException(`Folder with ID ${id} was not found.`)

    return folder
  }

  async getAll() {
    const folders = await this.foldersRepo.find({
      relations: {
        pieces: true,
        subFolders: true,
      },
    })

    return folders
  }

  async findMultipleByIds(ids: number[]) {
    const folders = await this.foldersRepo.find({
      where: {
        id: In(ids),
      },
    })

    return folders
  }

  async create(createFolderDto: CreateFolderDto) {
    const folder = this.foldersRepo.create(createFolderDto)

    if (isAnArrayWithItem(createFolderDto.parentFolderIds)) {
      const parents = await this.findMultipleByIds(
        createFolderDto.parentFolderIds,
      )

      const foundIds = parents.map(p => p.id)
      const missingIds = createFolderDto.parentFolderIds.filter(
        id => !foundIds.includes(id),
      )

      const isMissing = isAnArrayWithItem(missingIds)
      if (isMissing)
        throw new NotFoundException(
          `Parent folder(s) with ID(s) ${missingIds.join(", ")} not found.`,
        )

      folder.parentFolders = parents
    }

    await this.foldersRepo.save(folder)

    return folder
  }

  async remove(id: number) {
    const folder = await this.findOneById(id)

    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const pieces = folder.pieces

      for (const piece of pieces) await queryRunner.manager.remove(piece)

      await queryRunner.manager.remove(folder)

      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
  }
}

function isAnArrayWithItem<T>(sth: T[] | undefined | null): sth is T[] {
  return Array.isArray(sth) && sth.length !== 0
}
