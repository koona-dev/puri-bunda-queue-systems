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
import { ApiBody } from "@nestjs/swagger";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  @ApiBody({ type: CreateDashboardDto })
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  findAll() {
    return this.dashboardService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthenticationGuard)
  findOne(@Param("id") id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthenticationGuard)
  @ApiBody({ type: UpdateDashboardDto })
  update(
    @Param("id") id: string,
    @Body() updateDashboardDto: UpdateDashboardDto
  ) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param("id") id: string) {
    return this.dashboardService.remove(+id);
  }
}
