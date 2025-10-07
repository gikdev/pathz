import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FileType } from "./file-type.enum";

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fileId: string

  @Column()
  type: FileType

  @Column()
  extention: string

  @Column()
  mime: string

  @Column()
  size: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
