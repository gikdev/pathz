import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { PieceType } from "./piece-type.enum"
import { Folder } from "src/folders/folder.entity"

@Entity()
export class Piece {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "int", default: 0 })
  position: number

  @Column({ type: "simple-enum", enum: PieceType, default: PieceType.TEXT })
  type: PieceType

  @Column({ type: "simple-json" })
  payload: Record<string, any>

  @ManyToOne(() => Folder, f => f.pieces)
  folder: Folder
}
