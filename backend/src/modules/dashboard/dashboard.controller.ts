import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { CreateDashboardDto } from "./dto/create-dashboard.dto";
import { UpdateDashboardDto } from "./dto/update-dashboard.dto";
import JwtAuthenticationGuard from "src/utils/guards/jwt-authentication.guard";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll() {
    return this.dashboardService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.dashboardService.findOne(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDashboardDto: UpdateDashboardDto
  ) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.dashboardService.remove(+id);
  }
}
