import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { FolderType } from "./folder-type.enum"

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
}
