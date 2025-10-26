import { Expose } from "class-transformer"

export class DeletedResDto {
  @Expose()
  id!: number
}
