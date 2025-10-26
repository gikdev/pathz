import { Param, ParseIntPipe } from "@nestjs/common"

export const ParamId = () => Param("id", ParseIntPipe)
