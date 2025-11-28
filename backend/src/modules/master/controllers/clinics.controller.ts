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
import { ApiBody, ApiQuery } from "@nestjs/swagger";

@Controller("clinics")
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)  
  findOne(@Query() query: ClinicsQueryParams) {
    return this.clinicsService.findOne(query);
  }

  @Get("list")
  @UseGuards(JwtAuthenticationGuard)  
  findAll(@Query() query: ClinicsQueryParams) {
    return this.clinicsService.findMany(query);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  @ApiBody({ type: CreateClinicDto })
  create(@Body() createClinicsDto: CreateClinicDto) {
    return this.clinicsService.create(createClinicsDto);
  }

  @Patch(":clinicId")
  @UseGuards(JwtAuthenticationGuard)
  @ApiBody({ type: UpdateClinicDto })
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
