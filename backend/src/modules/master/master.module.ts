import { Module } from "@nestjs/common";

import { PatientsController } from "./controllers/patients.controller";
import { StaffController } from "./controllers/staff.controller";
import { ClinicsController } from "./controllers/clinics.controller";
import { DoctorsController } from "./controllers/doctors.controller";
import PatientsService from "./services/patients.service";
import StaffService from "./services/staff.service";
import ClinicsService from "./services/clinics.service";
import DoctorsService from "./services/doctors.service";

@Module({
  controllers: [
    PatientsController,
    StaffController,
    ClinicsController,
    DoctorsController,
  ],
  providers: [PatientsService, StaffService, ClinicsService, DoctorsService],
})
export class MasterModule {}
