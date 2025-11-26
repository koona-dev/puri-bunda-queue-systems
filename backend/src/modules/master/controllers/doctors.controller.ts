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

@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findOne(@Query() query: DoctorsQueryParams) {
    return this.doctorsService.findOne(query);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll(@Query() query: DoctorsQueryParams) {
    return this.doctorsService.findMany(query);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createDoctorsDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorsDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(":doctorId")
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
