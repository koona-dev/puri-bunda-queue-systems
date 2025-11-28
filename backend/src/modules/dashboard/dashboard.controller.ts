import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import JwtAuthenticationGuard from "src/utils/guards/jwt-authentication.guard";
import { DashboardService } from "./dashboard.service";

@ApiTags("Dashboard Analytics")
@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getDashboardSummary() {
    const summary = await this.dashboardService.getDashboardSummary();
    return summary;
  }
}
