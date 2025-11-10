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
import DoctorsService from "../services/doctors.service";
import { DoctorsQueryParams } from "../dtos/doctors/doctors-query.params";
import { CreateDoctorDto } from "../dtos/doctors/create-doctor.dto";
import { UpdateDoctorDto } from "../dtos/doctors/update-doctor.dto";

@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get(":doctorId")
  findById(@Param("doctorId") doctorId: string) {
    return this.doctorsService.findById(doctorId);
  }

  @Get()
  findOne(@Query() query: DoctorsQueryParams) {
    return this.doctorsService.findOne(query);
  }

  @Get()
  findAll(@Query() query: DoctorsQueryParams) {
    return this.doctorsService.findMany(query);
  }

  @Post()
  create(@Body() createDoctorsDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorsDto);
  }

  @Patch(":doctorId")
  update(
    @Param("doctorId") doctorId: string,
    @Body() updateDoctorsDto: UpdateDoctorDto
  ) {
    return this.doctorsService.update({ ...updateDoctorsDto, id: doctorId });
  }

  @Delete(":doctorId")
  remove(@Param("doctorId") doctorId: string) {
    return this.doctorsService.delete(doctorId);
  }
}
