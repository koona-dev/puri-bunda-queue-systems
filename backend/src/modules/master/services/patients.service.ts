import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from '../dtos/patients/create-patient.dto';
import { UpdatePatientDto } from '../dtos/patients/update-patient.dto';

@Injectable()
export class PatientsService {
  create(createPatientsDto: CreatePatientDto) {
    return 'This action adds a new queue';
  }

  findAll() {
    return `This action returns all queue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} queue`;
  }

  update(id: number, updatePatientsDto: UpdatePatientDto) {
    return `This action updates a #${id} queue`;
  }

  remove(id: number) {
    return `This action removes a #${id} queue`;
  }
}
