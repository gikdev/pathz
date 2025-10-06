import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum FileType {
  IMAGE= "IMAGE",
}

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id: number

  @Column({})
  name: string
  path: string
  type: FileType
  mime: string
  size: number
  createdAt: Date
  updatedAt: Date
}