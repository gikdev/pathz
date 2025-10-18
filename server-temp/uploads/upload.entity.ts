import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fileId: string

  @Column()
  extension: string

  @Column()
  mime: string

  @Column()
  size: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
