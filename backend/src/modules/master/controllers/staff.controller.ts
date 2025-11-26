import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";

import { CreateStaffDto } from "../dtos/staff/create-staff.dto";
import { UpdateStaffDto } from "../dtos/staff/update-satff.dto";
import StaffService from "../services/staff.service";
import { StaffQueryParams } from "../dtos/staff/staff-query.params";
import JwtAuthenticationGuard from "src/utils/guards/jwt-authentication.guard";

@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findOne(@Query() query: StaffQueryParams) {
    return this.staffService.findOne(query);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get("list")
  findAll(@Query() query: StaffQueryParams) {
    return this.staffService.findMany(query);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(":staffId")
  update(
    @Param("staffId") staffId: string,
    @Body() updateStaffDto: UpdateStaffDto
  ) {
    return this.staffService.update({ ...updateStaffDto, id: staffId });
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(":staffId")
  remove(@Param("staffId") staffId: string) {
    return this.staffService.delete(staffId);
  }
}
