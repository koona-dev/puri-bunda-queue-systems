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
import ClinicsService from "../services/clinics.service";
import { ClinicsQueryParams } from "../dtos/clinics/clinics-query.params";
import { CreateClinicDto } from "../dtos/clinics/create-clinic.dto";
import { UpdateClinicDto } from "../dtos/clinics/update-clinic.dto";

@Controller("clinics")
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get(":clinicId")
  findById(@Param("clinicId") clinicId: string) {
    return this.clinicsService.findById(clinicId);
  }

  @Get()
  findOne(@Query() query: ClinicsQueryParams) {
    return this.clinicsService.findOne(query);
  }

  @Get()
  findAll(@Query() query: ClinicsQueryParams) {
    return this.clinicsService.findMany(query);
  }

  @Post()
  create(@Body() createClinicsDto: CreateClinicDto) {
    return this.clinicsService.create(createClinicsDto);
  }

  @Patch(":clinicId")
  update(
    @Param("clinicId") clinicId: string,
    @Body() updateClinicsDto: UpdateClinicDto
  ) {
    return this.clinicsService.update({ ...updateClinicsDto, id: clinicId });
  }

  @Delete(":clinicId")
  remove(@Param("clinicId") clinicId: string) {
    return this.clinicsService.delete(clinicId);
  }
}
