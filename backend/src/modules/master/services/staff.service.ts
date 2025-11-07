import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from '../dtos/staff/create-staff.dto';
import { UpdateStaffDto } from '../dtos/staff/update-satff.dto';

@Injectable()
export class StaffService {
  create(createStaffDto: CreateStaffDto) {
    return 'This action adds a new queue';
  }

  findAll() {
    return `This action returns all queue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} queue`;
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return `This action updates a #${id} queue`;
  }

  remove(id: number) {
    return `This action removes a #${id} queue`;
  }
}
