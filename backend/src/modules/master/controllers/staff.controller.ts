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
import { ApiBody, ApiQuery } from "@nestjs/swagger";

@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @UseGuards(JwtAuthenticationGuard)
  @ApiQuery({
    type: StaffQueryParams,
  })
  @Get()
  findOne(@Query() query: StaffQueryParams) {
    return this.staffService.findOne(query);
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiQuery({
    type: StaffQueryParams,
  })
  @Get("list")
  findAll(@Query() query: StaffQueryParams) {
    return this.staffService.findMany(query);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  @ApiBody({ type: CreateStaffDto })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(":staffId")
  @ApiBody({ type: CreateStaffDto })
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
