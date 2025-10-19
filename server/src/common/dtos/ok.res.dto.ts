import { Expose } from "class-transformer"

export class OkResDto {
  @Expose()
  ok!: boolean
}
