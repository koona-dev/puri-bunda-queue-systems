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
import { CreatePatientDto } from "../dtos/patients/create-patient.dto";
import { UpdatePatientDto } from "../dtos/patients/update-patient.dto";
import PatientsService from "../services/patients.service";
import {
  FindManyPatientsQueryParams,
  FindOnePatientQueryParams,
} from "../dtos/patients/patients-query.params";
import JwtAuthenticationGuard from "src/utils/guards/jwt-authentication.guard";

@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findOne(@Query() query: FindOnePatientQueryParams) {
    return this.patientsService.findOne(query);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get("list")
  findMany(@Query() query: FindManyPatientsQueryParams) {
    return this.patientsService.findMany(query);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createPatientsDto: CreatePatientDto) {
    return this.patientsService.create(createPatientsDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(":patientId")
  update(
    @Param("patientId") patientId: string,
    @Body() updatePatientsDto: UpdatePatientDto
  ) {
    return this.patientsService.update({ ...updatePatientsDto, id: patientId });
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(":patientId")
  remove(@Param("patientId") patientId: string) {
    return this.patientsService.delete(patientId);
  }
}
