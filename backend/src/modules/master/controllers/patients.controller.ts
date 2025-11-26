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
import { CreatePatientDto } from "../dtos/patients/create-patient.dto";
import { UpdatePatientDto } from "../dtos/patients/update-patient.dto";
import PatientsService from "../services/patients.service";
import {
  FindManyPatientsQueryParams,
  FindOnePatientQueryParams,
} from "../dtos/patients/patients-query.params";

@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findOne(@Query() query: FindOnePatientQueryParams) {
    return this.patientsService.findOne(query);
  }

  @Get("list")
  findMany(@Query() query: FindManyPatientsQueryParams) {
    return this.patientsService.findMany(query);
  }

  @Post()
  create(@Body() createPatientsDto: CreatePatientDto) {
    return this.patientsService.create(createPatientsDto);
  }

  @Patch(":patientId")
  update(
    @Param("patientId") patientId: string,
    @Body() updatePatientsDto: UpdatePatientDto
  ) {
    return this.patientsService.update({ ...updatePatientsDto, id: patientId });
  }

  @Delete(":patientId")
  remove(@Param("patientId") patientId: string) {
    return this.patientsService.delete(patientId);
  }
}
