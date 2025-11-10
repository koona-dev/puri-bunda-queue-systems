import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";

import { CreateStaffDto } from "../dtos/staff/create-staff.dto";
import { UpdateStaffDto } from "../dtos/staff/update-satff.dto";
import StaffService from "../services/staff.service";
import { StaffQueryParams } from "../dtos/staff/staff-query.params";

@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get(":staffId")
  findById(@Param("staffId") staffId: string) {
    return this.staffService.findById(staffId);
  }

  @Get()
  findOne(@Query() query: StaffQueryParams) {
    return this.staffService.findOne(query);
  }

  @Get()
  findAll(@Query() query: StaffQueryParams) {
    return this.staffService.findMany(query);
  }

  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Patch(":staffId")
  update(
    @Param("staffId") staffId: string,
    @Body() updateStaffDto: UpdateStaffDto
  ) {
    return this.staffService.update({ ...updateStaffDto, id: staffId });
  }

  @Delete(":staffId")
  remove(@Param("staffId") staffId: string) {
    return this.staffService.delete(staffId);
  }
}
