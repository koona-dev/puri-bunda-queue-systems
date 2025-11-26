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
import { ApiBody, ApiQuery } from "@nestjs/swagger";

@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  @ApiQuery({ type: FindOnePatientQueryParams })
  findOne(@Query() query: FindOnePatientQueryParams) {
    return this.patientsService.findOne(query);
  }

  @Get("list")
  @UseGuards(JwtAuthenticationGuard)
  @ApiQuery({ type: FindManyPatientsQueryParams })
  findMany(@Query() query: FindManyPatientsQueryParams) {
    return this.patientsService.findMany(query);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  @ApiBody({ type: CreatePatientDto })
  create(@Body() createPatientsDto: CreatePatientDto) {
    return this.patientsService.create(createPatientsDto);
  }

  @Patch(":patientId")
  @UseGuards(JwtAuthenticationGuard)
  @ApiBody({ type: UpdatePatientDto })
  update(
    @Param("patientId") patientId: string,
    @Body() updatePatientsDto: UpdatePatientDto
  ) {
    return this.patientsService.update({ ...updatePatientsDto, id: patientId });
  }

  @Delete(":patientId")
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param("patientId") patientId: string) {
    return this.patientsService.delete(patientId);
  }
}
