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
import ClinicsService from "../services/clinics.service";
import { ClinicsQueryParams } from "../dtos/clinics/clinics-query.params";
import { CreateClinicDto } from "../dtos/clinics/create-clinic.dto";
import { UpdateClinicDto } from "../dtos/clinics/update-clinic.dto";
import JwtAuthenticationGuard from "src/utils/guards/jwt-authentication.guard";

@Controller("clinics")
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findOne(@Query() query: ClinicsQueryParams) {
    return this.clinicsService.findOne(query);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll(@Query() query: ClinicsQueryParams) {
    return this.clinicsService.findMany(query);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createClinicsDto: CreateClinicDto) {
    return this.clinicsService.create(createClinicsDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(":clinicId")
  update(
    @Param("clinicId") clinicId: string,
    @Body() updateClinicsDto: UpdateClinicDto
  ) {
    return this.clinicsService.update({ ...updateClinicsDto, id: clinicId });
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(":clinicId")
  remove(@Param("clinicId") clinicId: string) {
    return this.clinicsService.delete(clinicId);
  }
}
