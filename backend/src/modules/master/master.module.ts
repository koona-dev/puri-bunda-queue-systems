import { Module } from "@nestjs/common";
import { PatientsController } from "./controllers/patients.controller";
import { StaffController } from "./controllers/staff.controller";
import { PatientsService } from "./services/patients.service";
import { StaffService } from "./services/staff.service";

@Module({
  controllers: [PatientsController, StaffController],
  providers: [PatientsService, StaffService],
})
export class MasterModule {}
