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
import DoctorsService from "../services/doctors.service";
import { DoctorsQueryParams } from "../dtos/doctors/doctors-query.params";
import { CreateDoctorDto } from "../dtos/doctors/create-doctor.dto";
import { UpdateDoctorDto } from "../dtos/doctors/update-doctor.dto";
import JwtAuthenticationGuard from "src/utils/guards/jwt-authentication.guard";
import { ApiBody, ApiQuery } from "@nestjs/swagger";

@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  @ApiQuery({ type: DoctorsQueryParams })
  findOne(@Query() query: DoctorsQueryParams) {
    return this.doctorsService.findOne(query);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  @ApiQuery({ type: DoctorsQueryParams })
  findAll(@Query() query: DoctorsQueryParams) {
    return this.doctorsService.findMany(query);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  @ApiBody({ type: CreateDoctorDto })
  create(@Body() createDoctorsDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorsDto);
  }

  @Patch(":doctorId")
  @UseGuards(JwtAuthenticationGuard)
  @ApiBody({ type: UpdateDoctorDto })
  update(
    @Param("doctorId") doctorId: string,
    @Body() updateDoctorsDto: UpdateDoctorDto
  ) {
    return this.doctorsService.update({ ...updateDoctorsDto, id: doctorId });
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(":doctorId")
  remove(@Param("doctorId") doctorId: string) {
    return this.doctorsService.delete(doctorId);
  }
}
