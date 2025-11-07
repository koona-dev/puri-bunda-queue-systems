import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePatientDto } from '../dtos/patients/create-patient.dto';
import { PatientsService } from '../services/patients.service';
import { UpdatePatientDto } from '../dtos/patients/update-patient.dto';


@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() createPatientsDto: CreatePatientDto) {
    return this.patientsService.create(createPatientsDto);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientsDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
