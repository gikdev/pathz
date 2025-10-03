import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { PieceType } from "./piece-type.enum"

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
}
