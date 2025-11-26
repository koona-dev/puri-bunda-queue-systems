import {  
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";

import { QueueType } from "../utils/queue-type.enum";
import { Priority } from "../utils/priority.enum";
import { ServiceType } from "../utils/service-type";
import { ReferenceType } from "../utils/reference-type.enum";
import { QueueStatus } from "../utils/queue-status.enum";

export class FindOneQueuesQueryParams {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  patientId?: string;

  @IsOptional()
  @IsString()
  clinicId?: string;

  @IsOptional()
  @IsString()
  doctorId?: string;

  @IsOptional()
  @IsString()
  staffId?: string;

  @IsOptional()
  @IsString()
  queueNumber?: string;

  @IsOptional()
  @IsDateString()
@Type(() => Date)
  createdAt?: Date;
}

export class FindManyQueuesQueryParams {
  @IsOptional()
  @IsEnum(QueueType)
  queueType?: QueueType;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  @IsEnum(ServiceType)
  serviceType?: ServiceType;

  @IsOptional()
  @IsEnum(ReferenceType)
  referenceType?: ReferenceType;

  @IsOptional()
  @IsDateString()
@Type(() => Date)
  reservationDate?: Date;

  @IsOptional()
  @IsEnum(QueueStatus)
  status?: QueueStatus;
}
