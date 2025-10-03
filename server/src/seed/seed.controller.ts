import { Controller, Post, HttpCode, HttpStatus } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"
import { SeedService } from "./seed.service"

@Controller("seed")
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiOperation({ summary: "Seed the DB." })
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async seed() {
    await this.seedService.run()
  }
}
