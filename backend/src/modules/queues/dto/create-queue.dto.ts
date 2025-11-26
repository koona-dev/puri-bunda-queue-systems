import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";

import { Priority } from "../utils/priority.enum";
import { QueueType } from "../utils/queue-type.enum";
import { ReferenceType } from "../utils/reference-type.enum";
import { ServiceType } from "../utils/service-type";

export class CreateQueueDto {
  @IsNotEmpty()
  @IsString()
  patientId: string;

  @IsNotEmpty()
  @IsString()
  clinicId: string;

  @IsNotEmpty()
  @IsString()
  doctorId: string;

  @IsNotEmpty()
  @IsString()
  staffId: string;

  @IsNotEmpty()
  @IsEnum(QueueType)
  queueType: QueueType;

  @IsNotEmpty()
  @IsEnum(Priority)
  priority: Priority;

  @IsNotEmpty()
  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @IsNotEmpty()
  @IsEnum(ReferenceType)
  referenceType: ReferenceType;

  @IsNotEmpty()
  @IsString()
  chiefComplaint: string;

  @IsNotEmpty()
  @IsString()
  symptoms: string;

  @IsNotEmpty()
  @IsDateString()
  @Type(() => Date)
  symptomsStartDate: Date;

  @IsOptional()
  @IsString()
  previousTreatment?: string | null;

  @IsNotEmpty()
  @IsDateString()
  @Type(() => Date)
  reservationDate: Date;

  @IsNotEmpty()
  @IsString()
  preferredTime: string;

  @IsOptional()
  @IsString()
  staffNotes?: string | null;
}
