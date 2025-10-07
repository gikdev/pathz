import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm"
import { FolderType } from "./enum/folder-type.enum"
import { Piece } from "../pieces/piece.entity"

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar")
  title: string

  @Column({ type: "varchar", nullable: true })
  description: string | null

  @Column({ type: "int", default: 0 })
  position: number

  @Column({ type: "simple-enum", enum: FolderType, nullable: true })
  type: FolderType | null

  @OneToMany(() => Piece, p => p.folder, { onDelete: "CASCADE", cascade: true })
  pieces: Piece[]

  @ManyToMany(() => Folder, f => f.subFolders)
  @JoinTable()
  parentFolders: Folder[]

  @ManyToMany(() => Folder, f => f.parentFolders, { onDelete: "CASCADE" })
  subFolders: Folder[]
}
